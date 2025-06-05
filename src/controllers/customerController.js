import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../models/customerModel.js";

export function getCustomers(req, res) {
  try {
    const customers = getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getCustomer(req, res) {
  try {
    const customer = getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createCustomerHandler(req, res) {
  try {
    const result = createCustomer(req.body);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function updateCustomerHandler(req, res) {
  try {
    const result = updateCustomer(req.params.id, req.body);
    res.json({ changes: result.changes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function deleteCustomerHandler(req, res) {
  try {
    const result = deleteCustomer(req.params.id);
    res.json({ changes: result.changes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
