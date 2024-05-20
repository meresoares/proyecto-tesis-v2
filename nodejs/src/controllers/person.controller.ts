// src/controllers/PersonController.ts

import { Request, Response } from 'express';
import PersonService from '../services/person.service';

/**
 * Controlador para manejar las solicitudes relacionadas con las personas.
*/
class PersonController {

  /**
   * Obtiene todas las personas.
   * @param req La solicitud HTTP.
   * @param res La respuesta HTTP.
   * @returns Una lista de todas las personas en formato JSON.
   */
  async getAllPersons(req: Request, res: Response) {
    try {
      const persons = await PersonService.getAllPersons();
      res.status(200).json(persons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
     * Obtiene una persona por su ID.
     * @param req La solicitud HTTP que contiene el ID de la persona.
     * @param res La respuesta HTTP.
     * @returns La persona encontrada en formato JSON, o un mensaje de error si no se encuentra.
  */

  async getPersonById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const person = await PersonService.getPersonById(id);
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Crea una nueva persona.
   * @param req La solicitud HTTP que contiene los datos de la nueva persona.
   * @param res La respuesta HTTP.
   * @returns La nueva persona creada en formato JSON, o un mensaje de error si falla la creación.
   */
  async createPerson(req: Request, res: Response) {
    try {
      const person = await PersonService.createPerson(req.body);
      res.status(201).json(person);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Actualiza una persona existente.
   * @param req La solicitud HTTP que contiene el ID de la persona y los nuevos datos.
   * @param res La respuesta HTTP.
   * @returns La persona actualizada en formato JSON, o un mensaje de error si falla la actualización.
   */

  async updatePerson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const person = await PersonService.updatePerson(id, req.body);
      res.status(200).json(person);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Elimina una persona por su ID.
   * @param req La solicitud HTTP que contiene el ID de la persona a eliminar.
   * @param res La respuesta HTTP.
   * @returns Un mensaje de éxito si la persona se elimina correctamente, o un mensaje de error si falla la eliminación.
   */
  async deletePerson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await PersonService.deletePerson(id);
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PersonController();
