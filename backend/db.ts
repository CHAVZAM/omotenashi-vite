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

// ✅ Export por defecto: compatible con `import db from "../db"`,
// pero sin crear el pool al importar el módulo.
type QueryArgs = Parameters<mysql.Pool["query"]>;
type ExecuteArgs = Parameters<mysql.Pool["execute"]>;

const db = {
  query: (...args: QueryArgs) => getPool().query(...args),
  execute: (...args: ExecuteArgs) => getPool().execute(...args),
} as unknown as mysql.Pool;

export default db;
