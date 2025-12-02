import express from "express";
import {
    getVariations,
    createVariation,
    updateVariation,
    deleteVariation
} from "../controllers/productVariationController.js";

const router = express.Router();

router.get("/product_variations", getVariations); // ?product_id=10&user_id=1
router.post("/product_variations", createVariation);
router.patch("/product_variations/:id", updateVariation);
router.delete("/product_variations/:id", deleteVariation);

export default router;
