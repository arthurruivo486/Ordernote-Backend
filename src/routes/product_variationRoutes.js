import express from 'express';
const router = express.Router();

import { getProduct_Variation} from "../controllers/product_variationController.js"

router.get("/product_variation", getProduct_Variation);

export default router;