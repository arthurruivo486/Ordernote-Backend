import { z } from "zod";
import { findAllOrders, createOrder, removeOrder, updateOrder } from "../models/orderModel.js";

const orderSchema = z.object({
    table_number: z.string().min(1, "Número da mesa é obrigatório"),
    notes: z.string().optional(),
    status: z.enum(["open", "closed", "canceled"])
});

export const getOrders = async (req, res) => {
    try {
        const orders = await findAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
};

export const createNewOrder = async (req, res) => {
    try {
        const orderData = orderSchema.parse(req.body);
        const result = await createOrder(orderData);
        res.status(201).json({ message: "Pedido criado com sucesso", orderId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao criar pedido" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await removeOrder(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao deletar pedido" });
    }
};

export const updateOrderInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const orderData = orderSchema.parse(req.body);
        const result = await updateOrder(id, orderData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
        res.status(200).json({ message: "Pedido atualizado com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao atualizar pedido" });
    }
};
