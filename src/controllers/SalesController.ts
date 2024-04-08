import { Request, Response } from 'express';
import SaleModel, { ISales, ISalesItem } from '../models/SalesModel';
import ProductModel from '../models/ProductModel';
import MetadataController from './MetaDataController';

export const getAllSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: ISales[] = await SaleModel.find().sort({ date: 1 }); // Ordenar por fecha descendente

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLengthSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const length: number = await SaleModel.countDocuments(); // Obtener el número de documentos en la colección
        res.status(200).json({ length });
    } catch (error) {
        console.error('Error fetching products length:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createSale = async (req: Request, res: Response) => {
    try {
        let products = req.body.products; // Obtener los productos vendidos de la solicitud
        // Si products no es un array, convertirlo en un array con un solo elemento
        // Iterar sobre cada producto vendido y actualizar el inventario
        for (const productSold of products) {
            const productId = productSold.productId;
            const unitsSold = productSold.units;

            // Restar unidades vendidas del inventario
            await ProductModel.findOneAndUpdate(
                { _id: productId },
                { $inc: { units: -unitsSold } } // Restar unidades vendidas del inventario
            );
        }

        // Crear y guardar la venta en la base de datos
        const newSale = new SaleModel(req.body);
        const savedSale = await newSale.save();
        await MetadataController.updateMetadata('salesMetadata');

        res.status(201).json(savedSale);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const createSales = async (req: Request, res: Response) => {
    try {
        const salesData = req.body; // Obtener los datos de ventas del cuerpo de la solicitud

        // Iterar sobre cada objeto de ventas
        for (const saleData of salesData) {
            let products = saleData.products; // Obtener los productos vendidos del objeto de ventas
            let saleDate = saleData.date;

            // Si products no es un array, enviar un error
            if (!Array.isArray(products)) {
                return res.status(400).json({ message: 'Los productos deben ser un array.' });
            }

            // Iterar sobre cada producto vendido y actualizar el inventario
            for (const productSold of products) {
                const productId = productSold.productId;
                const unitsSold = productSold.units;

                // Restar unidades vendidas del inventario
                await ProductModel.findOneAndUpdate(
                    { _id: productId },
                    { $inc: { units: -unitsSold } } // Restar unidades vendidas del inventario
                );
            }

            // Crear y guardar la venta en la base de datos
            const newSale = new SaleModel({ date: saleDate, products: products });
            await newSale.save();
        }
        await MetadataController.updateMetadata('salesMetadata');

        res.status(201).json({ message: 'Ventas creadas exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};




export const deleteSale = async (req: Request, res: Response) => {
    try {
        const deletedSale = await SaleModel.findByIdAndDelete(req.params.id);
        if (!deletedSale) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await MetadataController.updateMetadata('salesMetadata');
        res.json(deletedSale);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


const SalesController = {
    createSale,
    getAllSales,
    deleteSale,
    createSales,
    getLengthSales
}

export default SalesController;