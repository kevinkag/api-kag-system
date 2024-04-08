import express from 'express';
import productRoutes from './productRoutes'; // Suponiendo que tienes un archivo productRoutes.ts para las rutas de productos
import salesRoutes from './salesRoutes';
import syncRoutes from './syncRoutes';
import metadataRoutes from './metadataRoutes';

const router = express.Router();

router.use('/sync', syncRoutes)
router.use('/product', productRoutes); // Montar las rutas de productos en /products
router.use('/sales', salesRoutes)
router.use('/metadata', metadataRoutes )

export default router;
