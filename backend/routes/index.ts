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
console.log("routes/index.ts ▶️ Inicializando router principal");

// Rutas existentes
console.log("routes/index.ts ➜ Registrando /posts");
router.use("/posts", postsRoutes);
console.log("routes/index.ts ➜ Registrando /mapa");
router.use("/mapa", mapaRoutes);
console.log("routes/index.ts ➜ Registrando /stats");
router.use("/stats", statsRoutes);
console.log("routes/index.ts ➜ Registrando /auth");
router.use("/auth", authRoutes);
console.log("routes/index.ts ➜ Registrando /test");
router.use("/test", testScrapeRoutes);
console.log("routes/index.ts ➜ Registrando /formacion");
router.use('/formacion', formacionRoutes);
console.log("routes/index.ts ➜ Registrando /interes");
router.use("/interes", interesRoutes); // === PATCH: agregar
console.log("routes/index.ts ➜ Registrando /certificados");
router.use("/certificados", certificadosRoutes);
console.log("routes/index.ts ➜ Registrando /user-progreso");
router.use("/user-progreso", userProgresoRoutes);

// 🚨 SOLUCIÓN CLAVE: AÑADIMOS LA RUTA DE ÓRDENES EN SU PROPIO ARCHIVO
console.log("routes/index.ts ➜ Registrando /orders");
router.use("/orders", ordersRoutes);
console.log("routes/index.ts ✅ Todos los routers montados");

export default router;
