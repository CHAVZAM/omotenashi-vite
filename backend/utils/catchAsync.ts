// backend/utils/catchAsync.ts
import { Request, Response, NextFunction } from "express";

// Este es un tipo genérico que representa un manejador de ruta de Express,
// que puede ser asíncrono y devolver una Promesa.
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Envuelve un manejador de ruta asíncrono para manejar errores de forma centralizada.
 * Si la Promesa del manejador es rechazada, el error se pasa al siguiente middleware de Express (next).
 * Esto evita que la aplicación se caiga y permite que tu middleware de manejo de errores global capture el error.
 * @param fn El manejador de ruta asíncrono.
 * @returns Una función de Express Middleware.
 */
const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Ejecuta la función y pasa cualquier error a 'next'
  };
};

export default catchAsync;
