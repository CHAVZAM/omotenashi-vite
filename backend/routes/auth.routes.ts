// backend/src/routes/auth.routes.ts

import { Router, Request, Response } from 'express'; // Asegúrate de importar Request y Response aquí también
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

// Define los tipos explícitamente para asegurar que TypeScript los reconozca como controladores
const registerHandler: (req: Request, res: Response) => Promise<any> = registerUser;
const loginHandler: (req: Request, res: Response) => Promise<any> = loginUser;


router.post('/register', registerHandler); // Usa el handler tipado
router.post('/login', loginHandler);       // Usa el handler tipado

export default router;