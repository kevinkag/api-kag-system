import { Request, Response } from 'express';
import ProductModel, { IProduct } from '../models/ProductModel';
import MetadataController from './MetaDataController';
import CollectionMetadataModel from '../models/CollectionMetaData';

// Controlador para consultar todos los productos
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProduct[] = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();


        await MetadataController.updateMetadata('productsMetadata');
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Controlador para borrar un producto por ID
export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
        await MetadataController.updateMetadata('productsMetadata');
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Controlador para editar un producto por ID
export const updateProductById = async (req: Request, res: Response) => {

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }


        await MetadataController.updateMetadata('productsMetadata');


        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const findProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const ProductController = {
    getAllProducts,
    findProductById,
    deleteProductById,
    updateProductById,
    createProduct
}

export default ProductController;
