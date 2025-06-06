import database from "../../db/connection.js";

export async function findAll() {
    try {
        const query = "SELECT * FROM sales;";
        const statement = database.prepare(query);
        const sales = statement.all();
        return sales;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sales: " + error.message);
    }
}

export async function create(saleData) {
    try {
        const query = `
            INSERT INTO sales (order_id, customer_id, user_id, total_amount, payment_method, status)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            saleData.order_id,
            saleData.customer_id ?? null,
            saleData.user_id,
            saleData.total_amount,
            saleData.payment_method,
            saleData.status
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating sale: " + error.message);
    }
}

export async function remove(id) {
    try {
        const query = "DELETE FROM sales WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting sale: " + error.message);
    }
}

export async function update(id, saleData) {
    try {
        const query = `
            UPDATE sales 
            SET order_id = ?, customer_id = ?, user_id = ?, total_amount = ?, payment_method = ?, status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            saleData.order_id,
            saleData.customer_id ?? null,
            saleData.user_id,
            saleData.total_amount,
            saleData.payment_method,
            saleData.status,
            id
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating sale: " + error.message);
    }
}
