// backend/utils/emailService.ts

import nodemailer from "nodemailer";

// Configuración del transportador (SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface OrderInfo {
  recipientName: string;
  email: string;
  quantity: number;
  totalPrice: number;
  address: string;
  city: string;
  phone: string;
}

// NOTA: La función de confirmación al cliente solo necesita 'order' (1 argumento).
// No se cambia, ya que el cliente solo necesita saber que el pedido fue creado.
export const sendPurchaseConfirmationEmail = async (order: OrderInfo) => {
  try {
    await transporter.sendMail({
      from: `"Omotenashi: el libro" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: "Confirmación de tu pedido de Omotenashi", // Cambiado de 'compra' a 'pedido'
      html: `
                <h1>¡Gracias por tu pedido, ${order.recipientName}!</h1>
                <p>Tu solicitud de pedido del libro "Omotenashi" ha sido recibida.</p>
                <p>Si pagaste con PayPal, tu orden será procesada pronto. Si usaste Nequi/DaviPlata, por favor, espera la confirmación manual.</p>
                <p><b>Detalles del pedido:</b></p>
                <ul>
                    <li>Cantidad: ${order.quantity}</li>
                    <li>Total: $${order.totalPrice} COP</li>
                </ul>
                <p>Pronto recibirás tu libro en la dirección de envío que proporcionaste.</p>
                <p>¡Esperamos que disfrutes de la lectura!</p>
            `,
    });
    console.log(`Correo de confirmación enviado a ${order.email}`);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};

// --- FUNCIÓN CORREGIDA PARA ACEPTAR 3 ARGUMENTOS ---
export const sendAdminNotificationEmail = async (
  order: OrderInfo,
  status: "COMPLETADO" | "PENDIENTE (REVISAR PAGO)", // <-- NUEVO ARGUMENTO 2
  paymentMethod: string // <-- NUEVO ARGUMENTO 3
) => {
  try {
    await transporter.sendMail({
      from: `"Notificación de Omotenashi" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚨 NUEVA VENTA - Estado: ${status} [${paymentMethod}]`, // Asunto dinámico
      html: `
                <h2 style="color: ${
                  status === "COMPLETADO" ? "#00A86B" : "#FF4444"
                };">
                    ¡Nueva Venta! Estado: ${status}
                </h2>
                <p>Se ha realizado una nueva compra en tu sitio web.</p>
                <p><b>MÉTODO DE PAGO:</b> <span style="font-weight: bold;">${paymentMethod.toUpperCase()}</span></p>
                <hr/>
                <p><b>DETALLES DEL CLIENTE:</b></p>
                <ul>
                    <li>Comprador: ${order.recipientName}</li>
                    <li>Correo: ${order.email}</li>
                </ul>
                <p><b>DETALLES DEL PEDIDO:</b></p>
                <ul>
                    <li>Cantidad: ${order.quantity}</li>
                    <li>Total pagado: <span style="font-weight: bold;">$${
                      order.totalPrice
                    } COP</span></li>
                </ul>
                <p><b>INFORMACIÓN DE ENVÍO:</b></p>
                <p>Dirección: ${order.address}, ${order.city}</p>
                <p>Teléfono: ${order.phone}</p>
                <hr/>
                ${
                  status === "PENDIENTE (REVISAR PAGO)"
                    ? `<p style="color: #FF4444; font-weight: bold;">**ACCIÓN REQUERIDA:** Revisa tu cuenta de ${paymentMethod} y verifica el comprobante subido en la base de datos.</p>`
                    : ""
                }
            `,
    });
    console.log(
      `Correo de notificación de administrador enviado (Estado: ${status}).`
    );
  } catch (error) {
    console.error("Error al enviar la notificación de administrador:", error);
  }
};
// backend/utils/emailService.ts (Agregar al final del archivo)

// Nueva interfaz para solicitudes de Charla
interface CharlaRequest {
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  eventType: string;
  eventDetails: string;
}
