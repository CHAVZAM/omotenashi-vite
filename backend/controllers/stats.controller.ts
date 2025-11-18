import { Request, Response } from "express";
import { getPool } from "../db";

const pool = getPool();

// --- GET: obtener todas las estadísticas del sitio
export const getSiteStats = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.execute(
      `
      SELECT home_page_visits, calcula_omotenashi_interactions, certificates_delivered
      FROM estadisticas_sitio WHERE id = 1
    `
    );
    if (rows.length > 0) {
      res.json({ ok: true, data: rows[0] });
    } else {
      res.json({
        ok: true,
        data: {
          home_page_visits: 0,
          calcula_omotenashi_interactions: 0,
          certificates_delivered: 0,
        },
      });
    }
  } catch (error: any) {
    console.error("Error al obtener estadísticas del sitio:", error.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor." });
  }
};

export const updateHomePageVisits = async (req: Request, res: Response) => {
  try {
    await pool.execute(
      `
      INSERT INTO estadisticas_sitio (id, home_page_visits)
      VALUES (1, 1)
      ON DUPLICATE KEY UPDATE home_page_visits = home_page_visits + 1
    `
    );
    res.json({
      ok: true,
      message: "Visita a la página principal incrementada.",
    });
  } catch (error: any) {
    console.error("Error al incrementar visitas:", error.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor." });
  }
};

export const updateCalculaOmotenashiInteractions = async (
  req: Request,
  res: Response
) => {
  try {
    await pool.execute(
      `
      INSERT INTO estadisticas_sitio (id, calcula_omotenashi_interactions)
      VALUES (1, 1)
      ON DUPLICATE KEY UPDATE calcula_omotenashi_interactions = calcula_omotenashi_interactions + 1
    `
    );
    res.json({
      ok: true,
      message: 'Interacción en "Calcula tu Omotenashi" incrementada.',
    });
  } catch (error: any) {
    console.error("Error al incrementar interacciones:", error.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor." });
  }
};

export const updateCertificates = async (req: Request, res: Response) => {
  try {
    await pool.execute(
      `
      INSERT INTO estadisticas_sitio (id, certificates_delivered)
      VALUES (1, 1)
      ON DUPLICATE KEY UPDATE certificates_delivered = certificates_delivered + 1
    `
    );
    res.json({
      ok: true,
      message: "Certificados entregados incrementados.",
    });
  } catch (error: any) {
    console.error("Error al incrementar certificados:", error.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor." });
  }
};

export const setBaseStats = async (req: Request, res: Response) => {
  try {
    const {
      home_page_visits,
      calcula_omotenashi_interactions,
      certificates_delivered,
    } = req.body;

    const fields: string[] = [];
    const values: any[] = [];

    if (home_page_visits !== undefined) {
      fields.push("home_page_visits=?");
      values.push(home_page_visits);
    }
    if (calcula_omotenashi_interactions !== undefined) {
      fields.push("calcula_omotenashi_interactions=?");
      values.push(calcula_omotenashi_interactions);
    }
    if (certificates_delivered !== undefined) {
      fields.push("certificates_delivered=?");
      values.push(certificates_delivered);
    }

    if (!fields.length) {
      return res
        .status(400)
        .json({ ok: false, error: "No se proporcionaron campos válidos." });
    }

    await pool.execute(
      `UPDATE estadisticas_sitio SET ${fields.join(", ")} WHERE id=1`,
      values
    );
    res.json({
      ok: true,
      message: "Valores base actualizados correctamente.",
    });
  } catch (error: any) {
    console.error("Error al actualizar valores base:", error.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor." });
  }
};
