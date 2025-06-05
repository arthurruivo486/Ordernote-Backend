import { findAll, create, remove, update} from "../models/productVariationModel.js";
import { z } from "zod"

const productVariationSchema = z.object({
    product_id: z.number().int().positive("product_id deve ser um número inteiro positivo"),
    name: z.string().min(1, "Nome da variação é obrigatório"),
    price: z.number().min(0, "Preço deve ser maior ou igual a zero"),
    stock: z.number().min(0, "Estoque deve ser maior ou igual a zero")
});

export const getProductVariation = async (req, res) => {
    try {
        const productVariations = await findAll()
        res.status(200).json({ productVariations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const createProductVariation = async (req, res) => {
    try {
        //const productVariationData = req.body;
        const productVariationData = productVariationSchema.parse(req.body);
        const result = await create(productVariationData);
        res.status(201).json({ message: "productVariation created successfully",productVariationId: result.lastInsertRowid || result.lastInsertRowId});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const deleteProductVariation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "productVariation not found" });
        }
        res.status(200).json({ message: "productVariation deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });

    }
}

export const updateProductVariation = async (req, res) => {
    try {
        const { id } = req.params;
        const productVariationData = productVariationSchema.parse(req.body);
        const result = await update(id, productVariationData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "productVariation not found" });
        }
        res.status(200).json({ message: "productVariation updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}