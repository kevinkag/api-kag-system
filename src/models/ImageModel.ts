import mongoose, { Document, Schema, model } from 'mongoose';

// Modelo de Mongoose para la imagen
interface Image extends Document {
    name: string;
    contentType: string;
    data: Buffer;
}

const ImageSchema = new mongoose.Schema({
    name: String,
    contentType: String,
    data: Buffer
});

export const ImageModel = mongoose.model<Image>('Image', ImageSchema);
