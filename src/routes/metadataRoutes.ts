import express from 'express';
import MetadataController from '../controllers/MetaDataController';

const metadataRoutes = express.Router();

metadataRoutes.get('/', MetadataController.getMetadata);
metadataRoutes.put('/', MetadataController.updateMetadata)



export default metadataRoutes;