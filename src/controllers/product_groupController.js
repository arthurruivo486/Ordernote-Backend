import * as model from '../models/product_groupModel.js';

export async function getProductGroups(req, res) {
    try {
        const groups = await model.findAll();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createProductGroup(req, res) {
    try {
        const result = await model.create(req.body);
        res.status(201).json({ message: "Product group created", id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteProductGroup(req, res) {
    try {
        const { id } = req.params;
        await model.remove(id);
        res.status(200).json({ message: "Product group deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateProductGroup(req, res) {
    try {
        const { id } = req.params;
        await model.update(id, req.body);
        res.status(200).json({ message: "Product group updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
