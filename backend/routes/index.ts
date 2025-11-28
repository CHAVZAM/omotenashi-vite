// backend/routes/index.ts (SOLO RUTAS, SIN LOGICA DE MULTER)

import { Router, Request, Response, NextFunction } from "express";

const router = Router();
console.log("routes/index.ts ▶️ Inicializando router principal");

// Helper para carga perezosa (Lazy Loading)
const lazyLoad = (importFn: () => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const module = await importFn();
      const router = module.default;
      router(req, res, next);
    } catch (error) {
      console.error("Error cargando ruta perezosa:", error);
      next(error);
    }
  };
};

// Rutas existentes con Lazy Loading
console.log("routes/index.ts ➜ Registrando rutas (Lazy)");

router.use("/posts", lazyLoad(() => import("./posts.routes")));
router.use("/mapa", lazyLoad(() => import("./mapa.routes")));
router.use("/stats", lazyLoad(() => import("./stats.routes")));
router.use("/auth", lazyLoad(() => import("./auth.routes")));
router.use("/test", lazyLoad(() => import("./testScrape.routes")));
router.use("/formacion", lazyLoad(() => import("./formacion.routes")));
router.use("/interes", lazyLoad(() => import("./interesRoutes")));
router.use("/certificados", lazyLoad(() => import("./certificadosRoutes")));
router.use("/user-progreso", lazyLoad(() => import("./userProgresoRoutes")));
router.use("/orders", lazyLoad(() => import("./orders.routes")));

console.log("routes/index.ts ✅ Todos los routers montados (Lazy)");

export default router;
