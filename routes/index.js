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
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
export default router;
