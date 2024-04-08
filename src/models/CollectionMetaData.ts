import mongoose, { Schema, Document } from 'mongoose';

// Define un esquema para los metadatos de un objeto (como products o sales)
interface ObjectMetadata extends Document {
    lastModification: Date;
}

// Define un esquema para los metadatos de la colección
export interface CollectionMetadata extends Document {
    productsMetadata: ObjectMetadata;
    salesMetadata: ObjectMetadata;
}

// Define el esquema para los metadatos de un objeto (como products o sales)
const objectMetadataSchema = new Schema({
    lastModification: { type: Date, required: true }
});

// Define el esquema para los metadatos de la colección
const collectionMetadataSchema = new Schema({
    productsMetadata: { type: objectMetadataSchema, required: true },
    salesMetadata: { type: objectMetadataSchema, required: true }
});

// Define y exporta el modelo basado en el esquema
const CollectionMetadataModel = mongoose.model<CollectionMetadata>('Metadata', collectionMetadataSchema);

export default CollectionMetadataModel;
