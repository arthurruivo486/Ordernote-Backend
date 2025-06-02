import { findAll, create, remove, update} from "../models/productModel.js";
import { z } from "zod"

const productSchema = z.object({
    name: z.string().min(1, "nome do usuario é obrigatório"),
    description: z.string().min(1, "descrição do produto é obrigatória"),
    image_url: z.string().url("URL inválida").optional(),
});

export const getProducts = async (req, res) =>{
    try {
        const products = await findAll()
        res.status(200).json({products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const createProduct = async (req, res) => {
    try {
        //const productData = req.body;
        const productData = productSchema.parse(req.body);


        const result = await create(productData);
        res.status(201).json({ message: "Product created successfully", ProductId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id}  = req.params;
        const result = await remove(id);
        if (result.changes === 0){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
        
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const productData = productSchema.parse(req.body);
        const result = await update(id, productData);
        if (result.changes === 0){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}