import express from 'express';
const router = express.Router();

import { createSale, getSales, updateSale, deleteSale,getItemsBySaleId } from "../controllers/saleController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// Todas as rotas protegidas pelo middleware
router.use(authMiddleware);
router.get("/sales/:sale_id/items", getItemsBySaleId);

router.get("/sales", getSales);
router.post("/sales", createSale);
router.patch("/sales/:id", updateSale);
router.delete("/sales/:id", deleteSale);

export default router;