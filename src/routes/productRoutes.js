import express from 'express';
const router = express.Router();

import {createProduct, deleteProduct, getProducts, updateProduct} from "../controllers/productController.js"

router.get("/product", getProducts);
router.post("/product", createProduct);
router.delete("/product/:id", deleteProduct);
router.patch("/product/:id", updateProduct);


export default router;