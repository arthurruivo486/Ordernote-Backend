import { findAll, create, remove, update, findByUserId } from "../models/productModel.js";
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image_url: z.string().url("URL inválida").optional().or(z.literal('')),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
  stock: z.number().int().min(0, "Estoque deve ser 0 ou mais"),
  group_id: z.number().int().optional().nullable(), // se for obrigatório, remova o .optional()
  user_id: z.number().int().optional(), // ✅ Adicionar user_id ao schema
});

export const getProducts = async (req, res) => {
    try {
        const { user_id } = req.query;
        
        let products;
        if (user_id) {
            // ✅ Buscar produtos específicos do usuário
            products = await findByUserId(parseInt(user_id));
        } else {
            // Buscar todos os produtos (para compatibilidade)
            products = await findAll();
        }
        
        res.status(200).json(products); // ✅ Retornar array diretamente para compatibilidade com frontend
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const productData = productSchema.parse(req.body);

        const result = await create(productData);
        res.status(201).json({ 
            message: "Product created successfully", 
            productId: result.lastInsertRowid,
            id: result.lastInsertRowid // ✅ Para compatibilidade
        });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                message: "Dados de validação inválidos",
                errors: error.errors 
            });
        }
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.query; // ✅ Obter user_id da query para verificação de permissão

        const result = await remove(id, user_id ? parseInt(user_id) : null);
        
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        if (error.message.includes("not found") || error.message.includes("permission")) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.query; // ✅ Obter user_id da query para verificação de permissão
        const productData = productSchema.parse(req.body);

        const result = await update(id, productData, user_id ? parseInt(user_id) : null);
        
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                message: "Dados de validação inválidos",
                errors: error.errors 
            });
        }
        if (error.message.includes("not found") || error.message.includes("permission")) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}