// src/pages/DondeComprar.tsx
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import "./DondeComprar.css";
import SocialMedia from "../components/FormacionOnline/SocialMedia";

// --- IMÁGENES CENTRALES ---
const paypalLogo =
  "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg";
const amazonLogo =
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg";
const appleBooksLogo = "/images/apple_books_logo.png";
const qrDavivienda = "/images/qr-davivienda.png";
const llaveBrebLogo = "/images/llave-breb.png";
const bookCover = "/images/portada.png";
const cartEmptyIcon = "/images/icons/carritovacio.svg";
const cartAddIcon = "/images/icons/carritocomprar.svg";
const cartRemoveIcon = "/images/icons/carritoeliminar.svg";
const cartConfirmIcon = "/images/icons/carritoconfirmar.svg";

const DondeComprar = () => {
  // Precio actualizado
  const [cart, setCart] = useState({ quantity: 0, price: 60000 });
  const [distributors] = useState([
    "Librería El Ateneo (Madrid España)",
    "Papeleria,librería   compass Centro comercial  Colombia  calle Bucaramanga 2(Madrid España)",
    "Papelería  Luyen calle Vital Aza ,48  ciudad lineal(Madrid España)",
    "Merkalibro librería  villalba Calle Real ,36   codigo postal 28400(Madrid España)",
  ]);
  const [error, setError] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  // Estado para el formulario de envío y comprobante
  const [shippingInfo, setShippingInfo] = useState({
    recipientName: "",
    address: "",
    city: "",
    phone: "+57",
    email: "",
    proofFile: null as File | null,
    transactionId: "",
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  // Validar si el formulario está completo
  useEffect(() => {
    const { recipientName, address, city, phone, email } = shippingInfo;
    const isPhoneValid = phone.length >= 12;
    if (recipientName && address && city && isPhoneValid && email) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [shippingInfo]);

  // Función para formatear precios en COP con separador de miles
  const formatCOP = (amount: number): string => {
    return amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const updateQuantity = (delta: number) => {
    try {
      setCart((prev) => ({
        ...prev,
        quantity: Math.max(0, prev.quantity + delta),
      }));
      setShowPayPal(false);
      setPaymentMethod(null);
      setFormDisabled(false);
    } catch (err) {
      setError("Error al actualizar la cantidad. Por favor, intenta de nuevo.");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setCart((prev) => ({
          ...prev,
          quantity: Math.max(0, parsedValue),
        }));
        setShowPayPal(false);
        setPaymentMethod(null);
        setFormDisabled(false);
      }
    } catch (err) {
      setError("Error al cambiar la cantidad. Por favor, usa un número válido.");
    }
  };

  const removeFromCart = () => {
    try {
      setCart((prev) => ({
        ...prev,
        quantity: 0,
      }));
      setShowPayPal(false);
      setPaymentMethod(null);
      setFormDisabled(false);
      setShippingInfo({
        recipientName: "",
        address: "",
        city: "",
        phone: "+57",
        email: "",
        proofFile: null,
        transactionId: "",
      });
    } catch (err) {
      setError("Error al vaciar el carrito. Por favor, intenta de nuevo.");
    }
  };

  const handleConfirmPurchase = () => {
    if (cart.quantity > 0 && formComplete) {
      setShowPayPal(true);
      setFormDisabled(true);
    }
  };

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "proofFile" && "files" in e.target) {
      const inputElement = e.target as HTMLInputElement;
      setShippingInfo((prev) => ({
        ...prev,
        proofFile: inputElement.files ? inputElement.files[0] : null,
      }));
      return;
    }
    if (name === "phone") {
      if (!value.startsWith("+57")) {
        setShippingInfo((prev) => ({ ...prev, phone: "+57" }));
      } else if (value === "+57" && e.target.value.length < 3) {
        return;
      } else {
        setShippingInfo((prev) => ({ ...prev, phone: value }));
      }
    } else {
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Lógica de PayPal (Envío al backend) ---
  const createOrder = (data: any, actions: any) => {
    try {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: (cart.quantity * cart.price).toFixed(2),
              currency_code: "COP",
            },
            description: "Compra del libro Omotenashi",
            shipping: {
              name: { full_name: shippingInfo.recipientName },
              address: {
                address_line_1: shippingInfo.address,
                admin_area_2: shippingInfo.city,
                country_code: "CO",
              },
            },
          },
        ],
        intent: "CAPTURE",
      });
    } catch (err) {
      setError("Error al crear la orden de PayPal. Por favor, intenta de nuevo.");
      throw err;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log("Detalles del pago:", details);
      const response = await axios.post(
        "http://localhost:3001/api/orders/create-order",
        {
          paypalOrderId: details.id,
          quantity: cart.quantity,
          totalPrice: (cart.quantity * cart.price).toFixed(2),
          shippingInfo: shippingInfo,
          paymentMethod: "paypal",
        }
      );
      console.log("Respuesta del servidor:", response.data);
      removeFromCart();
      alert("¡Pago exitoso! Gracias por tu compra.");
    } catch (err) {
      console.error("Error al procesar el pago o guardar el pedido:", err);
      setError("Error al procesar el pago. Por favor, intenta de nuevo.");
      setShowPayPal(false);
      setFormDisabled(false);
      throw err;
    }
  };

  const onError = (err: any) => {
    console.error("PayPal Error:", err);
    setError(
      "Error en el pago. Por favor, intenta de nuevo. Detalles: " + err.message
    );
    setShowPayPal(false);
    setFormDisabled(false);
  };

  // --- Lógica de Llave Bre-B (Envío de Comprobante) ---
  const handleLocalPaymentSubmit = async () => {
    if (!shippingInfo.proofFile || !shippingInfo.transactionId) {
      alert("Por favor, adjunta el comprobante y el ID de la transacción.");
      return;
    }

    const uniqueOrderId = `LLAVE_${Date.now()}`;
    const formData = new FormData();
    formData.append("paypalOrderId", uniqueOrderId);
    formData.append("quantity", cart.quantity.toString());
    formData.append("totalPrice", (cart.quantity * cart.price).toFixed(2));
    formData.append("paymentMethod", "llave-breb");
    formData.append("transactionId", shippingInfo.transactionId);
    formData.append("proofFile", shippingInfo.proofFile);
    formData.append("shippingInfo", JSON.stringify(shippingInfo));

    try {
      const response = await axios.post(
        "http://localhost:3001/api/orders/create-order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del servidor (Llave Bre-B):", response.data);
      removeFromCart();
      alert(
        "¡Comprobante enviado! Recibirás un correo cuando el pago sea confirmado."
      );
    } catch (err) {
      console.error("Error al enviar comprobante local:", err);
      setError("Error al enviar el comprobante. Por favor, contacta a soporte.");
      setShowPayPal(false);
      setFormDisabled(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="donde-comprar-container">
      <h1 className="donde-comprar-title">
        Dónde Comprar el Libro - Omotenashi
      </h1>

      {/* AVISO DE CONFIANZA */}
      <div className="transfer-notice">
        ¡Pago fácil y seguro! Ahora puedes usar PayPal o tu Llave Bre-B con
        Davivienda para la transferencia.
      </div>

      <div className="sections-container">
        {/* Carrito de Compras - Fila Superior */}
        <section className="cart-section glassmorphic" aria-label="Carrito de compras">
          <div className="cart-content-with-shipping">
            <div className="cart-content">
              <div className="book-cover-wrapper">
                <img
                  src={bookCover}
                  alt="Portada del libro Omotenashi"
                  className="book-cover"
                />
              </div>
              <div className="cart-details">
                <h2 className="section-title">
                  <img
                    src={cartEmptyIcon}
                    alt="Carrito de compras"
                    className="section-icon"
                  />
                  Carrito de Compras libro físico Colombia.
                </h2>

                <div className="cart-controls">
                  <label htmlFor="quantity" className="cart-label">
                    Cantidad:
                  </label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="quantity-button quantity-decrease"
                      aria-label="Reducir cantidad"
                      disabled={cart.quantity === 0 || formDisabled}
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      value={cart.quantity}
                      onChange={handleQuantityChange}
                      className="quantity-input"
                      aria-live="polite"
                      disabled={formDisabled}
                    />
                    <button
                      onClick={() => updateQuantity(1)}
                      className="quantity-button quantity-increase"
                      aria-label="Aumentar cantidad"
                      disabled={formDisabled}
                    >
                      <img
                        src={cartAddIcon}
                        alt="Agregar al carrito"
                        className="inline-icon"
                      />
                    </button>
                  </div>
                </div>

                <div className="cart-summary">
                  <p>
                    Precio unitario COP:{" "}
                    <span className="highlight">{formatCOP(cart.price)}</span>
                  </p>
                  <p>
                    Cantidad: <span className="highlight">{cart.quantity}</span>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="highlight">
                      {formatCOP(cart.quantity * cart.price)}
                    </span>
                  </p>
                </div>

                <div className="cart-actions">
                  {cart.quantity > 0 && (
                    <button
                      onClick={removeFromCart}
                      className="remove-button"
                      aria-label="Eliminar del carrito"
                      disabled={formDisabled}
                    >
                      <img
                        src={cartRemoveIcon}
                        alt="Eliminar del carrito"
                        className="inline-icon"
                      />
                      Vaciar Carrito
                    </button>
                  )}
                  <div className="confirm-button-wrapper">
                    <button
                      onClick={handleConfirmPurchase}
                      className={`animated-button confirm-button ${
                        cart.quantity === 0 || !formComplete ? "disabled" : ""
                      }`}
                      aria-label="Confirmar compra"
                      disabled={cart.quantity === 0 || !formComplete}
                    >
                      <img
                        src={cartConfirmIcon}
                        alt="Confirmar compra"
                        className="inline-icon"
                      />
                      Confirmar Compra
                    </button>
                    {cart.quantity > 0 && formComplete && !showPayPal && (
                      <span className="confirm-tooltip glassmorphic-tooltip">
                        Al confirmar la compra, apruebas y confirmas los datos
                        de envío.
                      </span>
                    )}
                  </div>
                </div>

                {/* --- CONTENEDOR DE SELECCIÓN DE PAGO --- */}
                <div className="payment-options-container">
                  {showPayPal && (
                    <>
                      <h3 className="payment-title">
                        Selecciona tu Método de Pago:
                      </h3>
                      <div className="payment-method-selector">
                        {/* Opción 1: PayPal */}
                        <button
                          className={`payment-option ${
                            paymentMethod === "paypal" ? "selected" : ""
                          }`}
                          onClick={() => setPaymentMethod("paypal")}
                        >
                          <img
                            src={paypalLogo}
                            alt="PayPal"
                            className="payment-icon"
                          />
                          PayPal
                        </button>
                        {/* Opción 2: Llave Bre-B Davivienda */}
                        <button
                          className={`payment-option ${
                            paymentMethod === "llave-breb" ? "selected" : ""
                          }`}
                          onClick={() => setPaymentMethod("llave-breb")}
                        >
                          <img
                            src={llaveBrebLogo}
                            alt="Llave Bre-B Logo"
                            className="payment-icon"
                          />
                          Davivienda (Llave Bre-B)
                        </button>
                      </div>

                      {/* PayPal */}
                      {paymentMethod === "paypal" && (
                        <div className="paypal-button-wrapper">
                          <a
                            href="https://www.paypal.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logo-with-tooltip"
                            data-tooltip="Pagar con PayPal"
                          >
                            <img
                              src={paypalLogo}
                              alt="PayPal Logo"
                              className="paypal-logo"
                            />
                          </a>
                          <PayPalScriptProvider
                            options={{
                              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                              currency: "COP",
                              intent: "capture",
                            }}
                          >
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            />
                          </PayPalScriptProvider>
                        </div>
                      )}

                      {/* Llave Bre-B */}
                      {paymentMethod === "llave-breb" && (
                        <div className="local-payment-instructions glassmorphic">
                          <h3>Paga con Llave Bre-B Davivienda</h3>
                          <p className="payment-amount">
                            Monto Exacto a Transferir:{" "}
                            <span className="highlight">
                              {formatCOP(cart.quantity * cart.price)}
                            </span>
                            <br />
                            (se aplicará la tasa de cambio del día por tu banco,
                            exacto y seguro)
                          </p>
                          <p>Detalles de Pago:</p>
                          <ul>
                            <li>
                              Llave de Comercio{" "}
                              <span className="highlight">@DAVIRANKOMOTENAS</span>
                            </li>
                            <li>
                              Código de Comercio Único:{" "}
                              <span className="highlight">0090583809</span>
                            </li>
                            <li>
                              **Cuenta de Davivienda, ahorros [0570000470035767]
                            </li>
                          </ul>
                          <div className="qr-code-placeholder">
                            <img
                              src={qrDavivienda}
                              alt="Código QR Davivienda Llave Bre-B"
                              className="payment-qr"
                            />
                          </div>
                          <p className="important-note">
                            **IMPORTANTE:** Realiza la transferencia usando las
                            llaves o el QR y luego envía el comprobante y el ID
                            de transacción a continuación. La orden será marcada
                            como **PENDIENTE** hasta la verificación.
                          </p>

                          {/* Formulario de Comprobante */}
                          <div className="verification-form">
                            <div className="form-group">
                              <label htmlFor="transactionId">
                                ID de Transacción/Comprobante Bancario:
                              </label>
                              <input
                                type="text"
                                id="transactionId"
                                name="transactionId"
                                value={shippingInfo.transactionId}
                                onChange={handleShippingChange}
                                placeholder="Ej: 123456789"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="proofFile">
                                Adjuntar Comprobante (imagen/PDF):
                              </label>
                              <input
                                type="file"
                                id="proofFile"
                                name="proofFile"
                                accept="image/*,application/pdf"
                                onChange={handleShippingChange}
                                required
                              />
                            </div>
                            <button
                              onClick={handleLocalPaymentSubmit}
                              className="animated-button confirm-local-payment"
                              disabled={
                                !shippingInfo.proofFile ||
                                !shippingInfo.transactionId
                              }
                            >
                              Enviar Comprobante y Finalizar Pedido
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Formulario de Envío */}
            {cart.quantity > 0 && (
              <div className="shipping-form glassmorphic">
                <h3 className="shipping-title">Datos de Envío</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="recipientName">Nombre de quien recibe:</label>
                    <input
                      type="text"
                      id="recipientName"
                      name="recipientName"
                      value={shippingInfo.recipientName}
                      onChange={handleShippingChange}
                      disabled={formDisabled}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      disabled={formDisabled}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección de envío:</label>
                    <textarea
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      disabled={formDisabled}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Ciudad:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      disabled={formDisabled}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Número de teléfono:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      disabled={formDisabled}
                      required
                      pattern="\+57[0-9]{10}"
                      title="El número debe empezar con +57 seguido de 10 dígitos."
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Fila Inferior: Compra Online y Distribuidores */}
        <div className="bottom-row">
          <section
            className="online-purchase-section glassmorphic"
            aria-label="Opciones de compra online"
          >
            <h2 className="section-title">Compra Online Versión Digital</h2>
            <ul className="online-links">
              <li>
                <a
                  href="https://amazon.com/author/cesarjchaves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-with-tooltip online-link"
                  data-tooltip="Comprar en Amazon"
                >
                  <img
                    src={amazonLogo}
                    alt="Amazon Logo"
                    className="online-logo amazon-logo"
                  />
                  Amazon
                </a>
              </li>
              <li>
                <a
                  href="http://books.apple.com/us/book/id6752909446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-with-tooltip online-link"
                  data-tooltip="Comprar en Apple Books"
                >
                  <img
                    src={appleBooksLogo}
                    alt="Apple Books Logo"
                    className="online-logo apple-books-logo"
                  />
                  Apple Books
                </a>
              </li>
              <li className="future-link">Enlace adicional (próximamente)</li>
            </ul>
          </section>

          <section
            className="distributors-section glassmorphic"
            aria-label="Lista de distribuidores y librerías"
          >
            <h2 className="section-title">Distribuidores y Librerías</h2>
            <div className="distributors-list">
              {distributors.map((distributor, index) => (
                <p key={index} className="distributor-item">
                  {distributor}
                </p>
              ))}
            </div>
          </section>
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default DondeComprar;