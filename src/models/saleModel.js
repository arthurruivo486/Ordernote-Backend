import database from "../../db/connetion.js";

export async function findAll() {
    try {
        const query = "SELECT * FROM sales;";
        const statement = database.prepare(query);
        const sale = statement.all();
        return sale;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sale: " + error.message);
    }
}

export async function create(saleData) {
    try {
        const query = `
            INSERT INTO sale (order_id, customer_id, user_id, total_amount, payment_method, status)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            saleData.order_id,
            saleData.customer_id,
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
        const query = "DELETE FROM sale WHERE id = ?;";
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
            UPDATE sale
            SET order_id = ?, customer_id = ?, user_id = ?, total_amount = ?, payment_method = ?, status = ?
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        const result = statement.run(
            saleData.order_id,
            saleData.customer_id,
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
