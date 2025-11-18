// backend/api/index.ts
export default async function handler(req: any, res: any) {
  res.status(200).json({
    ok: true,
    message: "Función serverless viva (sin Express todavía) ✅",
    path: req.url,
    ts: Date.now(),
  });
}