// backend/app.ts
import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import multer from "multer";

const app: Application = express();

// CORS básico (frontend en Hostinger y localhost)
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

// ✅ Endpoint de salud, SIN BD, SIN RUTAS, SIN NADA EXTERNO
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "API Omotenashi funcionando 🧠✨ (versión mínima)",
    ts: Date.now(),
  });
});

// Middleware global de errores (por si algo lanza error)
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
