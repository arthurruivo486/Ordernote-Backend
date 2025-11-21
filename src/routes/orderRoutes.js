import express from 'express';
const router = express.Router();

import { 
    createNewOrder, 
    getAllOrders, 
    updateOrderController,  // ← Nome corrigido
    deleteOrderController   // ← Nome corrigido
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// ✅ APLICAR MIDDLEWARE DE AUTENTICAÇÃO EM TODAS AS ROTAS
router.use(authMiddleware);

router.get("/order", getAllOrders);
router.post("/order", createNewOrder);
router.patch("/order/:id", updateOrderController);  // ← Nome corrigido
router.delete("/order/:id", deleteOrderController); // ← Nome corrigido

export default router;