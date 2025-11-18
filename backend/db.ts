// backend/db.ts
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

// Export nombrado: para usarlo donde lo necesites manualmente
export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  }
  return pool;
}

// Export por defecto: para todo el código que hace `import db from "../db"`
const db = getPool();
export default db;
