// backend/api/index.ts
import type { IncomingMessage, ServerResponse } from "http";
import serverless from "serverless-http";
import app from "../app";

const handler = serverless(app);

export default async (req: IncomingMessage, res: ServerResponse) => {
  return handler(req as any, res as any);
};
