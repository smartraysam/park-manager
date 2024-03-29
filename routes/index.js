// Contains all endpoints for the API
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from  '../docs/swagger-output.json';

import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = express.Router();
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users/create', UsersController.createUser);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/users/me', UsersController.getUser);
export default router;
