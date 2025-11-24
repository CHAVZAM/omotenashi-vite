// backend/api/index.ts
import serverless from "serverless-http";

let cachedHandler: any = null;

// Respuestas mínimas para evitar cold start de todo Express en los healthchecks
const sendJson = (res: any, statusCode: number, body: Record<string, any>) => {
  if (res.headersSent || res.writableEnded) return;
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

export default async function (req: any, res: any) {
  try {
    const path = (req?.url || "").split("?")[0]; // normaliza y elimina query

    // Fast-path: /api/health sin cargar toda la app
    if (path === "/api/health") {
      return sendJson(res, 200, {
        ok: true,
        message: "API Omotenashi viva (fast health)",
        ts: Date.now(),
      });
    }

    // Fast-path: /api/health/db con mínima carga
    if (path === "/api/health/db") {
      try {
        const db = (await import("../db")).default;
        await db.query("SELECT 1");
        return sendJson(res, 200, {
          ok: true,
          message: "Conexión a BD OK (fast health)",
          ts: Date.now(),
        });
      } catch (error: any) {
        console.error("Fast health DB error:", error);
        return sendJson(res, 500, {
          ok: false,
          message: "Error conectando a la BD en health",
          error: error?.message || String(error),
        });
      }
    }

    // Cargamos app solo una vez, de forma diferida
    if (!cachedHandler) {
      console.time("serverless_bootstrap");
      console.log("1️⃣ Cargando app.ts...");
      const appModule = await import("../app");
      console.log("2️⃣ Carga de app.ts lista, generando handler...");
      const app = appModule.default;
      cachedHandler = serverless(app);
      console.timeEnd("serverless_bootstrap");
    }

    return cachedHandler(req, res);
  } catch (err: any) {
    console.error("Error en la función serverless:", err);

    // Siempre devolvemos una respuesta, para evitar el crash de Vercel
    return sendJson(res, 500, {
      ok: false,
      message: "Error interno en la función serverless",
      error: err?.message || String(err),
    });
  }
}
