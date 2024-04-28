// src/routes/personRoutes.ts

import { Router } from 'express';
import PersonController from '../controllers/person.controller';

const router = Router();

// Rutas para operaciones CRUD
router.get('/persons', PersonController.getAllPersons);
router.get('/persons/:id', PersonController.getPersonById);
router.post('/persons', PersonController.createPerson);
router.put('/persons/:id', PersonController.updatePerson);
router.delete('/persons/:id', PersonController.deletePerson);

export default router;
