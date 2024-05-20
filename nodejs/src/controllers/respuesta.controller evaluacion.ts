import { Request, Response } from 'express';
import RespuestaService from '../services/respuesta.service evaluacion';

/**
 * Controlador para manejar las solicitudes relacionadas con las respuestas.
 */
class RespuestaController {

  /**
  * Crea una nueva respuesta.
  * @param req La solicitud HTTP que contiene los datos de la nueva respuesta.
  * @param res La respuesta HTTP.
  */

  async createRespuesta(req: Request, res: Response): Promise<void> {
    try {
      const respuestaConEvaluacion = await RespuestaService.createRespuesta(req.body);
      res.status(201).json(respuestaConEvaluacion);
    } catch (error: any) {
      // Manejo de errores específicos
      if (error.message.startsWith('Validation Error')) {
        res.status(400).json({ message: error.message });
      } else if (error.message.startsWith('Database Error')) {
        res.status(500).json({ message: error.message });
      } else {
        // Error genérico
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }
  }

  async getRespuestaByPersonaId(req: Request, res: Response): Promise<void> {
    try {
      const personaId = req.params.personaId;
      const resultado = await RespuestaService.getRespuestaByPersonaId(personaId);
      if (resultado) {
        res.status(200).json({ resultado });
      } else {
        res.status(404).json({ message: 'No se encontró el resultado para este usuario' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el resultado', error: error.message });
    }
  }

}

export default new RespuestaController();
