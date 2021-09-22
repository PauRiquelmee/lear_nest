import { Router } from 'express';
import * as usersController from '../controllers/user-controller';

export const routerUser = Router();

routerUser.post('/create', usersController.createUser);
routerUser.get('', usersController.getUsers);
routerUser.get('/:userId', usersController.getUsersById);
