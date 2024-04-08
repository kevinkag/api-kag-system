// routes/imageRoutes.ts
import express from 'express';
import { upload } from '../middlewares/multerConfig';
import { uploadImage, getImage } from '../controllers/ImageController';

const imageRoutes = express.Router();

// Ruta para subir una imagen
imageRoutes.post('/upload', upload.single('image'), uploadImage);

// Ruta para obtener una imagen por su nombre
imageRoutes.get('/images/:name', getImage);

export default imageRoutes;
