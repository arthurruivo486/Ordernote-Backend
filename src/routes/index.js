import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import saleRoutes from './salesRoutes.js';
import productRoutes from './productRoutes.js';
import product_variationRoutes from './product_variationRoutes.js';




router.use('/', userRoutes);
router.use('/', productRoutes);
router.use('/', saleRoutes);
router.use('/', product_variationRoutes);

export default router;