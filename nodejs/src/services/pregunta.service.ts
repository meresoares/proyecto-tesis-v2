// pregunta.service.ts

import Pregunta from '../models/pregunta.model';

class PreguntaService {
    async getAllPreguntas(): Promise<Pregunta[]> {
        try {
            const preguntas = await Pregunta.findAll();
            return preguntas;
        } catch (error) {
            console.error('Error al obtener las preguntas:', error);
            throw new Error('Error al obtener las preguntas');
        }
    }
}

export default new PreguntaService();
