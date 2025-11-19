// backend/api/index.ts
import serverless from "serverless-http";
import app from "../app";

const expressHandler = serverless(app);

// Handler que invoca Vercel para cualquier /api/*
export default async function (req: any, res: any) {
  return expressHandler(req, res);
}
