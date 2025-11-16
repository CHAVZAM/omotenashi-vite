// ===== FILE: backend/routes/userProgresoRoutes.ts =====
import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

/**
 * Utilidad: obtener user_id desde email (tabla users)
 */
async function getUserIdByEmail(email: string): Promise<number | null> {
  const [rows] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
  const arr = rows as any[];
  if (!arr.length) return null;
  return Number(arr[0].id);
}

/**
 * GET /api/user-progreso?email=...
 * Devuelve los 4 niveles con su estado (completado/aprobado)
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const email = String(req.query.email || "").trim().toLowerCase();
    if (!email) return res.status(400).json({ ok: false, error: "FALTA_EMAIL" });

    const userId = await getUserIdByEmail(email);
    if (!userId) return res.status(404).json({ ok: false, error: "USER_NOT_FOUND" });

    const [rows] = await db.execute(
      "SELECT nivel, completado, aprobado FROM user_progreso WHERE user_id = ?",
      [userId]
    );

    // Base por defecto (4 niveles)
    const niveles = Array.from({ length: 4 }, (_, i) => ({
      nivel: i + 1,
      completado: 0,
      aprobado: 0,
    }));

    // Rellenar con datos reales
    (rows as any[]).forEach((r) => {
      const idx = Number(r.nivel) - 1;
      if (idx >= 0 && idx < 4) {
        niveles[idx] = {
          nivel: Number(r.nivel),
          completado: Number(r.completado) ? 1 : 0,
          aprobado: Number(r.aprobado) ? 1 : 0,
        };
      }
    });

    res.json({ ok: true, found: true, niveles });
  } catch (err: any) {
    console.error("❌ GET /api/user-progreso:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/user-progreso
 * Body: { email: string, niveles: [{nivel, completado, aprobado}] }
 * Hace UPSERT por (user_id, nivel)
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, niveles } = req.body || {};
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !Array.isArray(niveles) || !niveles.length) {
      return res.status(400).json({ ok: false, error: "FALTAN_CAMPOS" });
    }

    const userId = await getUserIdByEmail(cleanEmail);
    if (!userId) return res.status(404).json({ ok: false, error: "USER_NOT_FOUND" });

    const list = niveles
      .map((n: any) => ({
        nivel: Number(n.nivel),
        completado: n.completado ? 1 : 0,
        aprobado: n.aprobado ? 1 : 0,
      }))
      .filter((n) => n.nivel >= 1 && n.nivel <= 4);

    const ops = list.map((n) =>
      db.execute(
        `INSERT INTO user_progreso (user_id, nivel, completado, aprobado, fecha_aprobacion)
         VALUES (?, ?, ?, ?, CASE WHEN ? = 1 THEN NOW() ELSE fecha_aprobacion END)
         ON DUPLICATE KEY UPDATE 
           completado = VALUES(completado),
           aprobado = VALUES(aprobado),
           fecha_aprobacion = CASE WHEN VALUES(aprobado) = 1 THEN NOW() ELSE fecha_aprobacion END`,
        [userId, n.nivel, n.completado, n.aprobado, n.aprobado]
      )
    );

    await Promise.all(ops);
    res.json({ ok: true, message: "Progreso guardado correctamente" });
  } catch (err: any) {
    console.error("❌ POST /api/user-progreso:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
