import { findAll, create, remove, update } from "../models/saleModel.js";
import { z } from "zod";

const salechema = z.object({
    order_id: z.number(),
    customer_id: z.number().optional(),
    user_id: z.number(),
    total_amount: z.number(),
    payment_method: z.enum(["cash", "card", "pix"]),
    status: z.enum(["paid", "pending"]),
});

export const getsale = async (req, res) => {
    try {
        const sale = await findAll();
        res.status(200).json({ sale });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const createSale = async (req, res) => {
    try {
        const saleData = salechema.parse(req.body);
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
        const saleData = salechema.parse(req.body);
        const result = await update(id, saleData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};
