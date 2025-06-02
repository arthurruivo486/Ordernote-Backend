import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import saleRoutes from './saleRoutes.js';
import productRoutes from './productRoutes.js';





router.use('/', userRoutes);
router.use('/', productRoutes);
router.use('/', saleRoutes);


export default router;