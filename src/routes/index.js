import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import saleRoutes from './saleRoutes.js';
import productRoutes from './productRoutes.js';
import customerRouter from './customerRouter.js';
import prouctGroupRouter from './product_groupRouter.js'
import productVariationRouter from './product_variationRoutes.js';
import saleItemRoutes from './sale_itemRoutes.js';


router.use('/', saleItemRoutes);
router.use('/',productVariationRouter)
router.use('/',prouctGroupRouter);
router.use('/', userRoutes);
router.use('/', productRoutes);
router.use('/', saleRoutes);
router.use('/', customerRouter);

export default router;