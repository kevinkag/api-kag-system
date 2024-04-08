import express from 'express';
import SyncController from '../controllers/SyncController';

const syncRoutes = express.Router();

// En el servidor
syncRoutes.post('/', SyncController.setChangesSync);

export default syncRoutes
