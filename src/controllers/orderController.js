import { createOrder, findAllOrders, updateOrder, removeOrder } from "../models/orderModel.js";

export const createNewOrder = async (req, res) => {
    try {
        console.log("📋 Criando novo pedido...");
        console.log("👤 Usuário autenticado:", req.user);
        console.log("📦 Dados recebidos:", req.body);

        // ✅ VERIFICAR SE req.user EXISTE
        if (!req.user || !req.user.id) {
            console.log("❌ Usuário não autenticado");
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        // ✅ Adicionar user_id do usuário autenticado
        const orderData = {
            ...req.body,
            user_id: req.user.id // ← Vem do middleware de autenticação
        };

        console.log("🎯 Dados do pedido com user_id:", orderData);

        const result = await createOrder(orderData);
        
        console.log("✅ Pedido criado com ID:", result.lastInsertRowid);
        
        res.status(201).json({ 
            message: "Pedido criado com sucesso", 
            orderId: result.lastInsertRowid 
        });
    } catch (error) {
        console.log("❌ Erro ao criar pedido:", error);
        res.status(500).json({ message: "Erro interno ao criar pedido" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        console.log("📋 Buscando pedidos...");
        console.log("👤 Usuário autenticado:", req.user);

        // ✅ VERIFICAR SE req.user EXISTE
        if (!req.user || !req.user.id) {
            console.log("❌ Usuário não autenticado");
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        // ✅ Filtrar pedidos apenas do usuário logado
        const orders = await findAllOrders(req.user.id);
        
        console.log(`✅ ${orders.length} pedidos encontrados`);
        
        res.status(200).json({ 
            message: "Pedidos carregados com sucesso",
            orders 
        });
    } catch (error) {
        console.log("❌ Erro ao buscar pedidos:", error);
        res.status(500).json({ message: "Erro interno ao buscar pedidos" });
    }
};

// ✅ CORREÇÃO: Mude o nome da função para evitar conflito
export const updateOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log("📝 Atualizando pedido:", id);
        console.log("👤 Usuário autenticado:", req.user);

        // ✅ VERIFICAR SE req.user EXISTE
        if (!req.user || !req.user.id) {
            console.log("❌ Usuário não autenticado");
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const orderData = {
            ...req.body,
            user_id: req.user.id // ← Garantir que o user_id seja do usuário logado
        };

        // ✅ Agora chama a função do model sem conflito
        const result = await updateOrder(id, orderData);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        res.status(200).json({ message: "Pedido atualizado com sucesso" });
    } catch (error) {
        console.log("❌ Erro ao atualizar pedido:", error);
        res.status(500).json({ message: "Erro interno ao atualizar pedido" });
    }
};

// ✅ CORREÇÃO: Mude o nome da função para evitar conflito
export const deleteOrderController = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("🗑️ Deletando pedido:", id);
        console.log("👤 Usuário autenticado:", req.user);

        // ✅ VERIFICAR SE req.user EXISTE
        if (!req.user || !req.user.id) {
            console.log("❌ Usuário não autenticado");
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        // ✅ Agora chama a função do model sem conflito
        const result = await removeOrder(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        console.log("❌ Erro ao deletar pedido:", error);
        res.status(500).json({ message: "Erro interno ao deletar pedido" });
    }
};