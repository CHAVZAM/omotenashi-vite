// ===== FILE: backend/routes/interesRoutes.ts =====
import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import db from "../db"; // <<< usamos tu pool existente

dotenv.config();
const router = Router();

// POST /api/interes
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellidos,
      profesion,
      edad,
      telefono,
      email,
      intereses,
      comentarios,
      origen,
    } = req.body || {};

    // Validación mínima
    if (!nombre || !apellidos || !email) {
      return res.status(400).json({ ok: false, error: "Faltan campos obligatorios" });
    }

    // 1) Guardar en BD
    await db.execute(
      `INSERT INTO omotenashi_interes 
       (nombre, apellidos, profesion, edad, telefono, email, intereses, comentarios, origen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        apellidos,
        profesion || null,
        edad || null,
        telefono || null,
        email,
        JSON.stringify(intereses || []),
        comentarios || null,
        origen || "formacion-online",
      ]
    );

    // 2) Enviar correo de notificación (via Gmail o tu SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // p.ej. tu cuenta Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const html = `
      <h2>📩 Nuevo Interesado en Omotenashi</h2>
      <ul>
        <li><b>Nombre:</b> ${nombre} ${apellidos}</li>
        <li><b>Profesión/Oficio:</b> ${profesion || "-"}</li>
        <li><b>Edad:</b> ${edad ?? "-"}</li>
        <li><b>Teléfono:</b> ${telefono || "-"}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Intereses:</b> ${(intereses || []).join(", ")}</li>
        <li><b>Comentarios:</b> ${comentarios || "-"}</li>
        <li><b>Origen:</b> ${origen || "formacion-online"}</li>
        <li><b>Fecha:</b> ${new Date().toLocaleString()}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: `"Rank Omotenashi" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // a quién llega en tu .env
      subject: `Nuevo interesado — ${nombre} ${apellidos}`,
      html,
    });

    return res.json({ ok: true, message: "Interés registrado y correo enviado" });
  } catch (err: any) {
    console.error("❌ Error en POST /api/interes:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
