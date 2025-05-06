import express from 'express';
const router = express.Router();

import { getSales } from "../controllers/saleController.js"

router.get("/sales", getSales);

export default router;