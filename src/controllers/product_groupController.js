import * as model from '../models/product_groupModel.js';

export async function getProductGroups(req, res) {
    try {
        // ✅ Obter o ID do usuário do token JWT
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        console.log(`📦 Buscando grupos do usuário: ${userId}`);
        const groups = await model.findByUserId(userId);
        
        console.log(`✅ ${groups.length} grupos encontrados para o usuário ${userId}`);
        res.status(200).json(groups);
    } catch (error) {
        console.error("❌ Erro ao buscar grupos:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function createProductGroup(req, res) {
    try {
        // ✅ Obter o ID do usuário do token JWT
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const { name, icon } = req.body;
        
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Nome do grupo é obrigatório" });
        }

        console.log(`🆕 Criando grupo para usuário ${userId}:`, { name, icon });
        const result = await model.create({ name: name.trim(), icon: icon?.trim() || null }, userId);
        
        console.log(`✅ Grupo criado com ID: ${result.lastInsertRowid}`);
        res.status(201).json({ 
            message: "Categoria criada com sucesso", 
            id: result.lastInsertRowid 
        });
    } catch (error) {
        console.error("❌ Erro ao criar grupo:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteProductGroup(req, res) {
    try {
        // ✅ Obter o ID do usuário do token JWT
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "ID do grupo é obrigatório" });
        }

        console.log(`🗑️ Excluindo grupo ${id} do usuário ${userId}`);
        await model.remove(id, userId);
        
        console.log(`✅ Grupo ${id} excluído com sucesso`);
        res.status(200).json({ message: "Categoria excluída com sucesso" });
    } catch (error) {
        console.error("❌ Erro ao excluir grupo:", error);
        
        if (error.message.includes("not found") || error.message.includes("permission")) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        res.status(500).json({ message: error.message });
    }
}

export async function updateProductGroup(req, res) {
    try {
        // ✅ Obter o ID do usuário do token JWT
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const { id } = req.params;
        const { name, icon } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "ID do grupo é obrigatório" });
        }
        
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Nome do grupo é obrigatório" });
        }

        console.log(`✏️ Atualizando grupo ${id} do usuário ${userId}:`, { name, icon });
        await model.update(id, { name: name.trim(), icon: icon?.trim() || null }, userId);
        
        console.log(`✅ Grupo ${id} atualizado com sucesso`);
        res.status(200).json({ message: "Categoria atualizada com sucesso" });
    } catch (error) {
        console.error("❌ Erro ao atualizar grupo:", error);
        
        if (error.message.includes("not found") || error.message.includes("permission")) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        res.status(500).json({ message: error.message });
    }
}