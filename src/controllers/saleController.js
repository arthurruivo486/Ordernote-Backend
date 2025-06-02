import { findAll, create, remove, update } from "../models/saleModel.js";
import { z } from "zod";


export const saleUpdateSchema = z.object({
  order_id: z.number().optional(),
  customer_id: z.number().nullable().optional(),
  user_id: z.number().optional(),
  total_amount: z.number().optional(),
  payment_method: z.enum(["cash", "credit_card", "debit_card", "pix"]).optional(),
  status: z.enum(["pending", "paid", "cancelled"]).optional()
});

export const getSales = async (req, res) => {
    try {
        const sales = await findAll();
        res.status(200).json({ sales });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const createSale = async (req, res) => {
    try {
        const saleData = saleSchema.parse(req.body);
        const result = await create(saleData);
        res.status(201).json({ message: "Sale created successfully", saleId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const saleData = saleUpdateSchema.parse(req.body); // usa o schema com todos opcionais
    const result = await update(id, saleData);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json({ message: "Sale updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.errors || "Validation error" });
  }
};
