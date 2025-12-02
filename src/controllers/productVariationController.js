import { z } from "zod";
import { findByProductId, create, remove, update } from "../models/productVariationModel.js";

const variationSchema = z.object({
    product_id: z.number().int(),
    user_id: z.number().int(),
    name: z.string().min(1, "Nome da variação é obrigatório"),
    price: z.number().min(0),
    is_active: z.boolean().optional()
});

// 🟦 Buscar variações de um produto
export const getVariations = async (req, res) => {
    try {
        const { product_id, user_id } = req.query;

        const variations = await findByProductId(
            parseInt(product_id),
            user_id ? parseInt(user_id) : null
        );

        res.status(200).json(variations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟦 Criar variação
export const createVariation = async (req, res) => {
    try {
        const data = variationSchema.parse(req.body);

        const result = await create(data);

        res.status(201).json({
            message: "Variation created successfully",
            id: result.lastInsertRowid
        });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟦 Atualizar variação
export const updateVariation = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.query;

        const data = variationSchema.partial().parse(req.body);

        await update(id, data, user_id ? parseInt(user_id) : null);

        res.status(200).json({ message: "Variation updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🟦 Deletar variação
export const deleteVariation = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.query;

        await remove(id, user_id ? parseInt(user_id) : null);

        res.status(200).json({ message: "Variation deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
