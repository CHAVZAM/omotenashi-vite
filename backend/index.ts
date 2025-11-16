// /Users/cesarchaves/omotenashi-vite/backend/index.ts (FINAL)

// CRÍTICO: Debemos importar la aplicación Express que exporta server.ts
import app from './server'; 

// 🚨 Vercel detecta esta exportación por defecto y la utiliza como Serverless Function.
export default app;