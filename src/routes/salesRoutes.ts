import express from 'express';
import SalesController from '../controllers/SalesController';

const salesRoutes = express.Router();

salesRoutes.get('/', SalesController.getAllSales);
salesRoutes.get('/length', SalesController.getLengthSales)
// productRoutes.get('/:id', ProductController.findProductById);
salesRoutes.post('/add', SalesController.createSale)
salesRoutes.post('/add-array', SalesController.createSales)
salesRoutes.delete('/delete/:id', SalesController.deleteSale)
// productRoutes.put('/edit/:id', ProductController.updateProductById)


export default salesRoutes;
