import { findAll, create, remove, update } from "../models/sale_itemModel.js";
import { z } from "zod";

const saleItemSchema = z.object({
    sale_id: z.number().int(),
    product_id: z.number().int(),
    quantity: z.number().int().min(1),
    unit_price: z.number().nonnegative(),
    subtotal: z.number().nonnegative()
});

export const getSaleItems = async (req, res) => {
    try {
        const items = await findAll();
        res.status(200).json({ items });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const createSaleItem = async (req, res) => {
    try {
        const itemData = saleItemSchema.parse(req.body);
        const result = await create(itemData);
        res.status(201).json({ message: "Sale item created" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteSaleItem = async (req, res) => {
    try {
        const { sale_id, product_id } = req.params;
        const result = await remove(sale_id, product_id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Sale item not found" });
        }
        res.status(200).json({ message: "Sale item deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const updateSaleItem = async (req, res) => {
    try {
        const { sale_id, product_id } = req.params;
        const itemData = saleItemSchema.parse(req.body);
        const result = await update(sale_id, product_id, itemData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Sale item not found" });
        }
        res.status(200).json({ message: "Sale item updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
