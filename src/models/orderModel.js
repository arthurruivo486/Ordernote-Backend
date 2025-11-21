import database from "../../db/connection.js";

export async function findAllOrders() {
    try {
        const query = "SELECT * FROM orders;";
        const statement = database.prepare(query);
        const orders = statement.all();
        return orders;
    } catch (error) {
        console.log("findAllOrders ERROR:", error);
        throw new Error("Erro ao buscar pedidos: " + error.message);
    }
}

export async function createOrder(orderData) {
    try {
        // ✅ VERIFIQUE SE A TABELA TEM user_id - se não tiver, remova essa coluna
        const query = `
            INSERT INTO orders (table_number, notes, status, created_at, updated_at)
            VALUES (?, ?, ?, datetime('now'), datetime('now'));
        `;

        const statement = database.prepare(query);
        const result = statement.run(
            orderData.table_number,
            orderData.notes ?? null,
            orderData.status
        );

        return result;
    } catch (error) {
        console.log("createOrder ERROR:", error);
        throw new Error("Erro ao criar pedido: " + error.message);
    }
}

export async function removeOrder(id) {
    try {
        const query = "DELETE FROM orders WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log("removeOrder ERROR:", error);
        throw new Error("Erro ao deletar pedido: " + error.message);
    }
}

export async function updateOrder(id, orderData) {
    try {
        const query = `
            UPDATE orders 
            SET table_number = ?, 
                notes = ?, 
                status = ?, 
                updated_at = datetime('now') 
            WHERE id = ?;
        `;

        const statement = database.prepare(query);
        const result = statement.run(
            orderData.table_number,
            orderData.notes ?? null,
            orderData.status,
            id
        );

        return result;
    } catch (error) {
        console.log("updateOrder ERROR:", error);
        throw new Error("Erro ao atualizar pedido: " + error.message);
    }
}