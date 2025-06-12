import database from "../../db/connection.js";

export async function findAllOrders() {
    try {
        const query = "SELECT * FROM orders;";
        const statement = database.prepare(query);
        const orders = statement.all();
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching orders: " + error.message);
    }
}

export async function createOrder(orderData) {
    try {
        const query = `
            INSERT INTO orders (table_number, notes, status, created_at, updated_at)
            VALUES (?, ?, ?, datetime('now'), datetime('now'));
        `;
        const statement = database.prepare(query);
        const result = statement.run(orderData.table_number, orderData.notes, orderData.status);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating order: " + error.message);
    }
}

export async function removeOrder(id) {
    try {
        const query = "DELETE FROM orders WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting order: " + error.message);
    }
}

export async function updateOrder(id, orderData) {
    try {
        const query = `
            UPDATE orders 
            SET table_number = ?, notes = ?, status = ?, updated_at = datetime('now') 
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        const result = statement.run(orderData.table_number, orderData.notes, orderData.status, id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating order: " + error.message);
    }
}
