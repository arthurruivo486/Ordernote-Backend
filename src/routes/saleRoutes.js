import express from 'express';
const router = express.Router();

import { getSales, createSale, deleteSale, updateSale } from "../controllers/saleController.js";

router.get("/sale", getSales);
router.post("/sale", createSale);
router.delete("/sale/:id", deleteSale);
router.patch("/sale/:id", updateSale);

export default router;
