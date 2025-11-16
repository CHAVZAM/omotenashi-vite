import { Router } from "express";
import {
  getSiteStats,
  updateHomePageVisits,
  updateCalculaOmotenashiInteractions,
  updateCertificates,
  setBaseStats, // ✅ nuevo import
} from "../controllers/stats.controller";
import catchAsync from "../utils/catchAsync";

const router = Router();

// Obtener todas las estadísticas del sitio
router.get("/", catchAsync(getSiteStats));

// Incrementar visitas al Home
router.post("/home-visit", catchAsync(updateHomePageVisits));

// Incrementar interacciones en "Calcula tu Omotenashi"
router.post("/calcula-interaction", catchAsync(updateCalculaOmotenashiInteractions));

// Incrementar certificados entregados
router.post("/certificate", catchAsync(updateCertificates));

// ✅ Establecer valores base manualmente (nuevo endpoint)
router.patch("/set-base", catchAsync(setBaseStats));

export default router;
