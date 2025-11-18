import { Request, Response } from "express";
import { getPool } from "../db";
import { updateAllPerceptionScores } from "../services/perceptionService";

const pool = getPool();

export const getMapaData = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.execute(
      "SELECT country_code, country_name, score, source, data_count FROM paises_percepcion"
    );

    const processedRows = rows.map((row: any) => ({
      ...row,
      score: parseFloat(row.score),
    }));

    res.json(processedRows);
  } catch (error: any) {
    console.error("Error al obtener datos del mapa:", error.message);
    res.status(500).json({
      message: "Error interno del servidor al obtener datos del mapa.",
    });
  }
};

export const getCountryData = async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  try {
    const [rows]: any = await pool.execute(
      "SELECT country_code, country_name, score, source, data_count FROM paises_percepcion WHERE country_code = ?",
      [countryCode]
    );

    if (rows.length > 0) {
      const countryData = {
        ...rows[0],
        score: parseFloat(rows[0].score),
      };
      res.json(countryData);
    } else {
      res.status(404).json({ message: "País no encontrado." });
    }
  } catch (error: any) {
    console.error(
      `Error al obtener datos del país ${countryCode}:`,
      error.message
    );
    res.status(500).json({
      message: "Error interno del servidor al obtener datos del país.",
    });
  }
};

export const updateCountryScore = async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const { score, source, data_count } = req.body;

  if (score === undefined || source === undefined || data_count === undefined) {
    return res.status(400).json({
      message: "Faltan campos requeridos (score, source, data_count).",
    });
  }

  try {
    const [result]: any = await pool.execute(
      "UPDATE paises_percepcion SET score = ?, source = ?, data_count = ? WHERE country_code = ?",
      [score, source, data_count, countryCode]
    );

    if (result.affectedRows > 0) {
      res.json({
        message: `Datos del país ${countryCode} actualizados exitosamente.`,
      });
    } else {
      res.status(404).json({ message: "País no encontrado para actualizar." });
    }
  } catch (error: any) {
    console.error(
      `Error al actualizar datos del país ${countryCode}:`,
      error.message
    );
    res.status(500).json({
      message: "Error interno del servidor al actualizar datos del país.",
    });
  }
};

export const updatePerceptionScores = async (req: Request, res: Response) => {
  try {
    console.log("Solicitud recibida para actualizar scores de percepción.");
    await updateAllPerceptionScores();
    console.log("Scores de percepción actualizados exitosamente.");
    res
      .status(200)
      .json({ message: "Scores de percepción actualizados exitosamente." });
  } catch (error) {
    console.error("Error al actualizar scores de percepción:", error);
    res.status(500).json({
      message: "Error interno del servidor al actualizar scores de percepción.",
    });
  }
};
