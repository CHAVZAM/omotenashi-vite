// backend/app.ts
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import routes from "./routes";
import { uploadsDir } from "./upload";

dotenv.config();

const app: Application = express();

// CORS: Hostinger (frontend), dominio raíz y localhost para desarrollo
app.use(
  cors({
    origin: [
      "https://www.rankomotenashi.com",
      "https://rankomotenashi.com",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parseo de JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (por si se usan comprobantes/ficheros subidos)
app.use("/uploads", express.static(uploadsDir));

// 🔹 Endpoint de salud (NO toca BD ni rutas)
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "API Omotenashi funcionando 🧠✨",
    ts: Date.now(),
  });
});

// 🔴 PARA DEPURAR: de momento comentado para ver si /api/health funciona solo
// Cuando verifiquemos que /api/health responde bien, descomenta esta línea:
//// app.use("/api", routes);

// Middleware global de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Error de subida: ${err.message}` });
  }

  if (err.message.includes("Tipo de archivo no soportado")) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
