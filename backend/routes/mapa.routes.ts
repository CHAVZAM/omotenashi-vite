// backend/routes/mapa.routes.ts

import { Router, Request, Response } from "express";
import {
  getMapaData,
  getCountryData,
  updateCountryScore,
  updatePerceptionScores,
} from "../controllers/mapa.controller";
import catchAsync from "../utils/catchAsync";
import { updatePerceptionScoreForCountry } from "../services/perceptionService";

const router = Router();

// ✅ Rutas principales
router.get("/", catchAsync(getMapaData));
router.get("/:countryCode", catchAsync(getCountryData));
router.put("/:countryCode", catchAsync(updateCountryScore));
router.post("/update-scores", catchAsync(updatePerceptionScores));

// ✅ Ruta dinámica de actualización
router.get(
  "/actualizar/:countryCode",
  catchAsync(async (req: Request, res: Response) => {
    const { countryCode } = req.params;
    const result = await updatePerceptionScoreForCountry(countryCode, 20);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron comentarios reales para este país.",
      });
    }

    return res.json({ success: true, score: result });
  })
);
export default router;