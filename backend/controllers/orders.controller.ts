import { Request, Response } from "express";
import { getPool } from "../db";
import {
  sendPurchaseConfirmationEmail,
  sendAdminNotificationEmail,
} from "../utils/emailService";

interface ShippingInfo {
  recipientName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  transactionId?: string;
}

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

const generateLocalOrderId = () => {
  return `LOCAL_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    const {
      paypalOrderId,
      quantity,
      totalPrice,
      paymentMethod,
      transactionId,
    } = req.body;

    const rawShippingInfo = req.body.shippingInfo;
    const shippingInfo: ShippingInfo =
      typeof rawShippingInfo === "string"
        ? JSON.parse(rawShippingInfo)
        : rawShippingInfo;

    if (!quantity || !totalPrice || !shippingInfo || !paymentMethod) {
      return res.status(400).json({ message: "Datos de pedido incompletos." });
    }

    const isPayPal = paymentMethod === "paypal";
    const isLocalPayment =
      paymentMethod === "nequi" ||
      paymentMethod === "daviplata" ||
      paymentMethod === "llave-breb";

    const initialStatus = isPayPal ? "completed" : "pending";

    let proofPath: string | null = null;
    if (isLocalPayment) {
      if (!req.file) {
        return res.status(400).json({
          message:
            "Comprobante de pago (archivo) es requerido para pagos locales.",
        });
      }
      proofPath = `/uploads/${req.file.filename}`;
    }

    const orderId = isPayPal ? paypalOrderId : generateLocalOrderId();

    const pool = getPool();

    const [orderResult]: any = await pool.execute(
      `INSERT INTO orders (
        paypal_order_id, customer_name, customer_email, shipping_address,
        shipping_city, shipping_phone, total_amount, payment_method,
        transaction_id, proof_of_payment_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        shippingInfo.recipientName,
        shippingInfo.email,
        shippingInfo.address,
        shippingInfo.city,
        shippingInfo.phone,
        totalPrice,
        paymentMethod,
        isLocalPayment ? transactionId : paypalOrderId,
        proofPath,
        initialStatus,
      ]
    );

    const orderIdInserted = orderResult.insertId;

    await pool.execute(
      `INSERT INTO order_items (order_id, product_name, quantity, price_per_unit)
       VALUES (?, ?, ?, ?)`,
      [
        orderIdInserted,
        "Libro Omotenashi",
        quantity,
        parseFloat(totalPrice) / quantity,
      ]
    );

    const orderDetails = {
      recipientName: shippingInfo.recipientName,
      email: shippingInfo.email,
      quantity: quantity,
      totalPrice: parseFloat(totalPrice),
      address: shippingInfo.address,
      city: shippingInfo.city,
      phone: shippingInfo.phone,
    };

    await sendPurchaseConfirmationEmail(orderDetails);

    if (isPayPal) {
      await sendAdminNotificationEmail(
        orderDetails,
        "COMPLETADO",
        paymentMethod
      );
    } else {
      await sendAdminNotificationEmail(
        orderDetails,
        "PENDIENTE (REVISAR PAGO)",
        paymentMethod
      );
    }

    res.status(201).json({
      message: `Pedido creado con éxito. Estado: ${initialStatus}`,
      orderId: orderIdInserted,
      status: initialStatus,
    });
  } catch (error: any) {
    console.error("Error al procesar el pedido:", error);
    res.status(500).json({
      message: "Error creando el pedido",
      error: error.message,
    });
  }
};
