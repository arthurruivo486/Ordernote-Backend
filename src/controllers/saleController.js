import { create, findAll, update, remove } from "../models/saleModel.js";
import {
  create as createSaleItem,
  findSaleItemsBySaleId,
} from "../models/sale_itemModel.js";

export const createSale = async (req, res) => {
  try {
    const { items, ...saleData } = req.body;

    // Validar se existem itens na venda
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "A venda precisa ter pelo menos um item." });
    }

    // Preparar dados da venda com user_id do usuário autenticado
    const completeSaleData = {
      ...saleData,
      user_id: req.user.id,
      sale_type: saleData.sale_type || "local", // defina um padrão se quiser
    };

    console.log("🧾 Criando venda para usuário:", req.user.id);
    console.log("📋 Dados da venda:", completeSaleData);
    console.log("📦 Itens da venda:", items);

    // 1️⃣ Criar venda principal
    const saleResult = await create(completeSaleData);
    const saleId = saleResult.lastInsertRowid;

    console.log("🆔 Venda criada ID:", saleId);

    // 2️⃣ Criar itens da venda
    for (const item of items) {
      await createSaleItem({
        sale_id: saleId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal,
      });
    }

    console.log("✅ Itens da venda criados com sucesso!");

    return res.status(201).json({
      message: "Venda criada com sucesso",
      saleId: saleId,
    });
  } catch (error) {
    console.log("❌ Erro ao criar venda:", error);
    return res.status(500).json({ message: "Erro interno ao criar venda" });
  }
};

export const getSales = async (req, res) => {
  try {
    // Filtrar vendas apenas do usuário logado
    const sales = await findAll(req.user.id);

    res.status(200).json({
      message: "Vendas carregadas com sucesso",
      sales,
    });
  } catch (error) {
    console.log("❌ Erro ao buscar vendas:", error);
    res.status(500).json({ message: "Erro interno ao buscar vendas" });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const saleData = {
      ...req.body,
      user_id: req.user.id, // Garantir que o user_id seja do usuário logado
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
export const getItemsBySaleId = async (req, res) => {
  const { sale_id } = req.params;

  try {
    const items = await findSaleItemsBySaleId(sale_id);
    return res.status(200).json({ items });
  } catch (error) {
    console.log("❌ Erro ao buscar itens da venda:", error);
    return res.status(500).json({ message: "Erro ao buscar itens da venda" });
  }
};
