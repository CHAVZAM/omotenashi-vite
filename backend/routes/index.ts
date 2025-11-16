// backend/routes/index.ts (SOLO RUTAS, SIN LOGICA DE MULTER)

import { Router } from "express";
import postsRoutes from "./posts.routes";
import mapaRoutes from "./mapa.routes";
import statsRoutes from "./stats.routes";
import authRoutes from "./auth.routes";
import testScrapeRoutes from "./testScrape.routes";
import ordersRoutes from "./orders.routes"; // <-- IMPORTA EL NUEVO ROUTER
import formacionRoutes from './formacion.routes'; // <-- NUEVA IMPORTACIÓN
import interesRoutes from "./interesRoutes"; // === PATCH: agregar
import certificadosRoutes from "./certificadosRoutes";
import userProgresoRoutes from "./userProgresoRoutes";




const router = Router();

// Rutas existentes
router.use("/posts", postsRoutes);
router.use("/mapa", mapaRoutes);
router.use("/stats", statsRoutes);
router.use("/auth", authRoutes);
router.use("/test", testScrapeRoutes);
router.use('/formacion', formacionRoutes);
router.use("/interes", interesRoutes); // === PATCH: agregar
router.use("/certificados", certificadosRoutes);
router.use("/user-progreso", userProgresoRoutes);

// 🚨 SOLUCIÓN CLAVE: AÑADIMOS LA RUTA DE ÓRDENES EN SU PROPIO ARCHIVO
router.use("/orders", ordersRoutes);

export default router;
