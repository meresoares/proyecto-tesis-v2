import Respuesta from '../models/respuesta.models';
import { ValidationError } from 'sequelize';

// Definición de tipos para las respuestas
type RespuestaValue = 'Nunca' | 'Muy poco' | 'Un poco' | 'Mucho' | 'Demasiado';
type Respuestas = Record<string, RespuestaValue>;
type ValoresRespuestas = Record<RespuestaValue, number>;

class SistemaExperto {
  // Asigna valores numéricos a cada respuesta
  private valores: ValoresRespuestas = {
    'Nunca': 0,
    'Muy poco': 1,
    'Un poco': 2,
    'Mucho': 3,
    'Demasiado': 4,
  };

  // Evalúa las respuestas basándose en la puntuación total
  evaluarRespuestas(respuestas: Respuestas): string {
    let puntuacion = 0;

    for (const respuesta of Object.values(respuestas)) {
      puntuacion += this.valores[respuesta];
    }

    // Clasifica el nivel de ansiedad basado en la puntuación
    if (puntuacion <= 10) {
      return 'Baja Ansiedad';
    } else if (puntuacion <= 20) {
      return 'Ansiedad Moderada';
    } else {
      return 'Alta Ansiedad';
    }
  }
}


class RespuestaService {
  private sistemaExperto: SistemaExperto = new SistemaExperto();

  async createRespuesta(respuestaData: Respuestas): Promise<Respuesta> {
    try {
      // Calcula la evaluación
      const evaluacion = this.sistemaExperto.evaluarRespuestas(respuestaData);
      console.log(`Evaluación calculada: ${evaluacion}`); // Depuración

      // Verifica que 'evaluacion' no sea 'null'
      if (!evaluacion) {
        throw new Error("La evaluación no se ha calculado correctamente.");
      }

      // Crea la respuesta con la evaluación incluida
      const respuesta = await Respuesta.create({
        ...respuestaData,
        evaluacion, // Asegúrate de que el modelo Sequelize tiene este campo.
      });

      console.log(`Respuesta creada con evaluación: ${respuesta.evaluacion}`); // Depuración

      return respuesta;
    } catch (error: any) {
      console.error('Error al crear la respuesta:', error); // Depuración
      if (error instanceof ValidationError) {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error(`Database Error: ${error.message}`);
      }
    }
  }
}

export default new RespuestaService();