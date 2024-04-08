import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ImageModel } from '../models/ImageModel';

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Por favor, sube un archivo' });
        }

        const newImage = new ImageModel({
            name: req.file.filename,
            contentType: req.file.mimetype,
            data: fs.readFileSync(req.file.path)
        });

        await newImage.save();

        // Elimina el archivo temporal después de guardar la imagen en la base de datos
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Imagen subida exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const image = await ImageModel.findOne({ name: req.params.name });

        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
