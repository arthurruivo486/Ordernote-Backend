import express from 'express';
const router = express.Router();

import {
    getProductGroups,
    createProductGroup,
    deleteProductGroup,
    updateProductGroup
} from "../controllers/product_groupController.js";

router.get("/product_groups", getProductGroups);
router.post("/product_groups", createProductGroup);
router.delete("/product_groups/:id", deleteProductGroup);
router.patch("/product_groups/:id", updateProductGroup);

export default router;
