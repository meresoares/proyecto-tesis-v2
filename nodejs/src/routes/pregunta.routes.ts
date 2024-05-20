// pregunta.routes.ts

import { Router } from 'express';
import PreguntaController from '../controllers/pregunta.controller';

const router = Router();

router.get('/preguntas', PreguntaController.getPreguntas);

export default router;
