import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// POST /api/certificados — registra una nueva descarga
router.post("/", async (req: Request, res: Response) => {
  try {
    const { nombre, email, origen } = req.body;
    if (!nombre) {
      return res.status(400).json({ ok: false, error: "Falta el nombre" });
    }

    await db.execute(
      "INSERT INTO omotenashi_certificados (nombre, email, origen) VALUES (?, ?, ?)",
      [nombre, email || null, origen || "formacion-online"]
    );

    return res.json({ ok: true, message: "Certificado registrado correctamente" });
  } catch (err: any) {
    console.error("Error al registrar certificado:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/certificados — devuelve el total
router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT COUNT(*) AS total FROM omotenashi_certificados");
    const total = (rows as any[])[0].total;
    res.json({ ok: true, total });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
