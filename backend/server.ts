// backend/server.ts
import dotenv from "dotenv";
import app from "./app";
import db from "./db";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

async function startServer() {
  try {
    const [rows] = await db.execute("SELECT 1 + 1 AS solution");
    console.log("✓ Conexión MySQL OK. Resultado:", (rows as any[])[0].solution);
  } catch (error) {
    console.error("⚠️ No se pudo conectar a MySQL al inicio:", error);
    console.error("⚠️ Revisa DB_HOST, DB_USER, DB_PASSWORD, DB_NAME en backend/.env");
    // 🚫 YA NO hacemos process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`✓ Backend local en http://localhost:${PORT}`);
  });
}

startServer();
// 🚨 EXPORTACIÓN CLAVE PARA VERCEL (Exporta la aplicación Express)
export default app;