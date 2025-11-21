import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomersByUserId,
} from "../models/customerModel.js";

export async function getCustomers(req, res) {
  try {
    // ✅ Obter user_id do middleware de autenticação
    const userId = req.user?.id;

    console.log("📞 Buscando clientes para usuário:", userId);

    // ✅ Buscar apenas clientes do usuário logado
    const customers = userId
      ? await getCustomersByUserId(userId)
      : await getAllCustomers();

    res.json(customers);
  } catch (error) {
    console.error("❌ Erro ao buscar clientes:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function getCustomer(req, res) {
  try {
    // ✅ Obter user_id do middleware de autenticação
    const userId = req.user?.id;

    console.log(
      "📞 Buscando cliente ID:",
      req.params.id,
      "para usuário:",
      userId
    );

    const customer = userId
      ? await getCustomerById(req.params.id, userId)
      : await getCustomerById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.json(customer);
  } catch (error) {
    console.error("❌ Erro ao buscar cliente:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function createCustomerHandler(req, res) {
  try {
    // ✅ Obter user_id do middleware de autenticação
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    console.log("👤 Criando cliente para usuário:", userId);
    console.log("📋 Dados do cliente:", req.body);

    // ✅ Adicionar user_id aos dados do cliente
    const customerData = {
      ...req.body,
      user_id: userId,
    };

    const result = await createCustomer(customerData);

    console.log("✅ Cliente criado com ID:", result.lastInsertRowid);

    // Buscar o cliente criado e retornar COMPLETO
    const newCustomer = await getCustomerById(result.lastInsertRowid, userId);

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("❌ Erro ao criar cliente:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateCustomerHandler(req, res) {
  try {
    // ✅ Obter user_id do middleware de autenticação
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    console.log(
      "✏️ Atualizando cliente ID:",
      req.params.id,
      "para usuário:",
      userId
    );

    // ✅ Atualizar apenas se o cliente pertencer ao usuário
    const result = await updateCustomer(req.params.id, req.body, userId);

    if (result.changes === 0) {
      return res.status(404).json({
        message:
          "Cliente não encontrado ou você não tem permissão para editá-lo",
      });
    }

    res.json({
      changes: result.changes,
      message: "Cliente atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar cliente:", error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCustomerHandler(req, res) {
  try {
    // ✅ Obter user_id do middleware de autenticação
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    console.log(
      "🗑️ Deletando cliente ID:",
      req.params.id,
      "para usuário:",
      userId
    );

    // ✅ Deletar apenas se o cliente pertencer ao usuário
    const result = await deleteCustomer(req.params.id, userId);

    if (result.changes === 0) {
      return res.status(404).json({
        message:
          "Cliente não encontrado ou você não tem permissão para excluí-lo",
      });
    }

    res.json({
      changes: result.changes,
      message: "Cliente excluído com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao excluir cliente:", error);
    res.status(500).json({ error: error.message });
  }
}
