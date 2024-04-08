import { Request, Response } from 'express';
import CollectionMetadataModel, { CollectionMetadata } from '../models/CollectionMetaData';
import moment from 'moment-timezone';


const getMetadata = async (req: Request, res: Response): Promise<void> => {
    try {
        const metadata: CollectionMetadata | null = await CollectionMetadataModel.findOne();
        if (metadata) {
            res.status(200).json(metadata);
        } else {
            res.status(404).json({ message: 'No se encontraron metadatos de colección.' });
        }
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la consulta a la base de datos
        console.error('Error al obtener metadatos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const updateMetadata = async (metadataType: any) => {
    try {
    
        if (metadataType !== 'productsMetadata' && metadataType !== 'salesMetadata') {
            return
        }

        await CollectionMetadataModel.findOneAndUpdate(
            {},
            { [metadataType]: { lastModification: new Date() } },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating metadata:', error);
    }
};


const MetadataController = {
    getMetadata,
    updateMetadata
}

export default MetadataController