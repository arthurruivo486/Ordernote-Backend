import express from 'express';
const router = express.Router();

import { getProduct} from "../controllers/productController.js"

router.get("/products", getProduct);

export default router;