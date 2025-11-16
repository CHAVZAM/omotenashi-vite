// backend/db.ts
import mysql from 'mysql2/promise';

declare global {
  var __omotenashiPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
  });
}

export function getPool(): mysql.Pool {
  if (!global.__omotenashiPool) {
    global.__omotenashiPool = createPool();
  }
  return global.__omotenashiPool;
}

export const pool = getPool();
export default pool;
