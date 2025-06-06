import express from 'express';
const router = express.Router();

import {
    getSaleItems,
    createSaleItem,
    deleteSaleItem,
    updateSaleItem
} from '../controllers/sale_itemController.js';

router.get('/sale_items', getSaleItems);
router.post('/sale_items', createSaleItem);
router.delete('/sale_items/:id', deleteSaleItem);
router.patch('/sale_items/:id', updateSaleItem);

export default router;
