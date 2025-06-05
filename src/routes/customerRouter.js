import express from 'express';
const router = express.Router();

import {
  getCustomers,
  getCustomer,
  createCustomerHandler,
  updateCustomerHandler,
  deleteCustomerHandler
} from "../controllers/customerController.js";

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", createCustomerHandler);
router.patch("/customers/:id", updateCustomerHandler);
router.delete("/customers/:id", deleteCustomerHandler);

export default router;
