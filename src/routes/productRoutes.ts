import express from 'express';
import ProductController from '../controllers/ProductController';
import { updateProductById, findProductById } from '../controllers/ProductController';

const productRoutes = express.Router();

productRoutes.get('/', ProductController.getAllProducts);
productRoutes.get('/:id', ProductController.findProductById);
productRoutes.post('/add', ProductController.createProduct)
productRoutes.delete('/delete/:id', ProductController.deleteProductById)
productRoutes.put('/edit/:id', ProductController.updateProductById)


export default productRoutes;
