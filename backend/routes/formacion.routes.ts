// backend/routes/formacion.routes.ts

import { Router } from 'express';
import { getProgreso, completarNivel } from '../controllers/formacion.controller';

const formacionRouter = Router();

// GET /api/formacion/progreso/123
formacionRouter.get('/progreso/:userId', getProgreso);

// POST /api/formacion/completar
formacionRouter.post('/completar', completarNivel);

export default formacionRouter;