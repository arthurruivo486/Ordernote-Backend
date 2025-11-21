import { create, findAll, update, remove } from "../models/saleModel.js";

export const createSale = async (req, res) => {
    try {
        // O user_id agora vem do middleware de autenticação
        const saleData = {
            ...req.body,
            user_id: req.user.id // ← Aqui usamos o ID do usuário autenticado
        };

        console.log("📦 Criando venda para usuário:", req.user.id);
        console.log("📋 Dados da venda:", saleData);

        const result = await create(saleData);
        
        res.status(201).json({ 
            message: "Venda criada com sucesso", 
            saleId: result.lastInsertRowid 
        });
    } catch (error) {
        console.log("❌ Erro ao criar venda:", error);
        res.status(500).json({ message: "Erro interno ao criar venda" });
    }
};

export const getSales = async (req, res) => {
    try {
        // Filtrar vendas apenas do usuário logado
        const sales = await findAll(req.user.id);
        
        res.status(200).json({ 
            message: "Vendas carregadas com sucesso",
            sales 
        });
    } catch (error) {
        console.log("❌ Erro ao buscar vendas:", error);
        res.status(500).json({ message: "Erro interno ao buscar vendas" });
    }
};

// ✅ ADICIONE ESTAS FUNÇÕES QUE ESTAVAM FALTANDO
export const updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const saleData = {
            ...req.body,
            user_id: req.user.id // Garantir que o user_id seja do usuário logado
        };

        const result = await update(id, saleData);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Venda não encontrada" });
        }

        res.status(200).json({ message: "Venda atualizada com sucesso" });
    } catch (error) {
        console.log("❌ Erro ao atualizar venda:", error);
        res.status(500).json({ message: "Erro interno ao atualizar venda" });
    }
};

export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await remove(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ message: "Venda não encontrada" });
        }

        res.status(200).json({ message: "Venda deletada com sucesso" });
    } catch (error) {
        console.log("❌ Erro ao deletar venda:", error);
        res.status(500).json({ message: "Erro interno ao deletar venda" });
    }
};