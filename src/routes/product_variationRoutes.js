import express from 'express';
const router = express.Router();

import {createProductVariation, deleteProductVariation, getProductVariation, updateProductVariation} from "../controllers/product_variationController.js";

router.get("/product_variation", getProductVariation);
router.post("/product_variation", createProductVariation);
router.delete("/product_variation/:id", deleteProductVariation);
router.patch("/product_variation/:id",  updateProductVariation);

export default router;