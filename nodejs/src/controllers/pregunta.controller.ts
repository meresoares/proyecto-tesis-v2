// pregunta.controller.ts

import { Request, Response } from 'express';
import Pregunta from '../models/pregunta.model';

class PreguntaController {
    async getPreguntas(req: Request, res: Response): Promise<void> {
        try {
            const preguntas = await Pregunta.findAll();
            res.status(200).json(preguntas);
        } catch (error) {
            console.error('Error al obtener las preguntas:', error);
            res.status(500).json({ message: 'Error al obtener las preguntas' });
        }
    }
}

export default new PreguntaController();
