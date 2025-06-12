import express from 'express';
const router = express.Router();

import {
    getOrders,
    createNewOrder,
    deleteOrder,
    updateOrderInfo
} from "../controllers/orderController.js";

router.get("/order", getOrders);
router.post("/order", createNewOrder);
router.delete("/order/:id", deleteOrder);
router.patch("/order/:id", updateOrderInfo);

export default router;
