// src/services/PersonService.ts

import { Op } from 'sequelize';
import Person from '../models/person.model';

class PersonService {
  async getAllPersons() {
    return await Person.findAll();
  }

  async getPersonById(id: string) {
    return await Person.findByPk(id);
  }

  async createPerson(personData: any) {
    return await Person.create(personData);
  }

  async updatePerson(id: number, personData: any) {
    const person = await Person.findByPk(id);
    if (person) {
      return await person.update(personData);
    }
    throw new Error('Person not found');
  }

  async deletePerson(id: number) {
    const person = await Person.findByPk(id);
    if (person) {
      return await person.destroy();
    }
    throw new Error('Person not found');
  }
}

export default new PersonService();
