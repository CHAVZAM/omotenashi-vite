import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import routes from "./routes";
import { uploadsDir } from "./upload";

dotenv.config();

const app: Application = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(uploadsDir));

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "API Omotenashi funcionando 🧠✨",
    ts: Date.now(),
  });
});

app.use("/api", routes);

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
