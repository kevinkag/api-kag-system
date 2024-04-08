import { Request, Response } from 'express';
import { createSale } from './SalesController';
import ProductModel from '../models/ProductModel';
import SalesModel from '../models/SalesModel';

interface Cambio {
    operation: 'create' | 'update' | 'delete';
    collection: string;
    data: any;
}

const setChangesSync = async (req: Request, res: Response) => {
    const cambios: Cambio[] = req.body.changes; // Obtener los cambios pendientes del cuerpo de la solicitud
    try {
        // Iterar sobre los cambios pendientes y aplicarlos en el servidor
        for (const cambio of cambios) {
            const { operation, collection, data } = cambio;
            // Lógica para aplicar el cambio en la colección correspondiente en la base de datos del servidor
            if (operation === 'create') {
                await crearDocumento(collection, data);
            } else if (operation === 'update') {
                await actualizarDocumento(collection, data);
            } else if (operation === 'delete') {
                await eliminarDocumento(collection, data);
            }
        }
        res.status(200).json({ message: 'Cambios aplicados exitosamente' });
    } catch (error) {
        console.error('Error al aplicar cambios:', error);
        res.status(500).json({ error: 'Error al aplicar cambios' });
    }
}

const SyncController = {
    setChangesSync
}

export default SyncController;




async function crearDocumento(collection: string, data: any) {
    console.log(data);
    try {
        if (collection === 'Sale') {
            // Accede a la propiedad `products` de `data`
            for (const productSold of data.products) {
                const productId = productSold.productId;
                const unitsSold = productSold.units;

                // Restar unidades vendidas del inventario
                await ProductModel.findOneAndUpdate(
                    { _id: productId },
                    { $inc: { units: -unitsSold } } // Restar unidades vendidas del inventario
                );
            }
            const newProduct = new SalesModel(data);
            const savedProduct = await newProduct.save();
        }
    } catch (error) {
        console.error('Error al crear documento:', error);
        throw error; // O maneja el error según tus necesidades
    }
}

async function actualizarDocumento(collection: string, data: any) {
    console.log({ updated: [collection, data] })
}

async function eliminarDocumento(collection: string, data: any) {
    console.log({ deleted: [collection, data] })
}