// backend/app.ts
import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import multer from "multer";
import routes from "./routes"; // ✅ Importa el index de rutas

const app: Application = express();
console.log("app.ts ▶️ Iniciando configuración de Express…");

// CORS básico (frontend en Hostinger y localhost)
const allowedOrigins = [
  "https://www.rankomotenashi.com",
  "https://rankomotenashi.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
console.log("app.ts ✅ Middleware de CORS configurado");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("app.ts ✅ Parsers JSON/URL-encoded listos");

// ✅ Endpoint de salud
console.log("app.ts 🩺 Registrando endpoint /api/health");
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "API Omotenashi funcionando 🧠✨ (versión mínima)",
    path: req.path,
    ts: Date.now(),
  });
});

// ✅ Montar TODAS las rutas bajo /api
console.log("app.ts 🛣️ Registrando router principal en /api");
app.use("/api", routes);

// Middleware global de errores (al final)
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error global:", err);
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `Error de subida: ${err.message}` });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
);

export default app;
