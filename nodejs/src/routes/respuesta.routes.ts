import { Router } from 'express';
import RespuestaController from '../controllers/respuesta.controller evaluacion';

const router = Router();

router.post('/respuestas', RespuestaController.createRespuesta);
router.post('/respuestas-ev', RespuestaController.createRespuesta);

// Rutas adicionales si son necesarias

export default router;
