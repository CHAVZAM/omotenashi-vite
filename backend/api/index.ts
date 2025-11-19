// backend/api/index.ts
import serverless from "serverless-http";

let cachedHandler: any = null;

export default async function (req: any, res: any) {
  try {
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
    res.status(500).json({
      ok: false,
      message: "Error interno en la función serverless",
      error: err?.message || String(err),
    });
  }
}
