import database from "../../db/connection.js";

export async function findAll() {
    try {
        const query = "SELECT * FROM sale_items;";
        const statement = database.prepare(query);
        return statement.all();
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching sale_items: " + error.message);
    }
}

export async function create(item) {
    try {
        const query = `
            INSERT INTO sale_items (
                sale_id, product_id, variation_id, quantity, unit_price, subtotal
            ) VALUES (?, ?, ?, ?, ?, ?);
        `;
        const statement = database.prepare(query);
        return statement.run(
            item.sale_id,
            item.product_id,
            item.variation_id,
            item.quantity,
            item.unit_price,
            item.subtotal
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error creating sale_item: " + error.message);
    }
}

export async function remove(id) {
    try {
        const statement = database.prepare("DELETE FROM sale_items WHERE id = ?;");
        return statement.run(id);
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting sale_item: " + error.message);
    }
}

export async function update(id, item) {
    try {
        const query = `
            UPDATE sale_items 
            SET sale_id = ?, product_id = ?, variation_id = ?, quantity = ?, unit_price = ?, subtotal = ?
            WHERE id = ?;
        `;
        const statement = database.prepare(query);
        return statement.run(
            item.sale_id,
            item.product_id,
            item.variation_id,
            item.quantity,
            item.unit_price,
            item.subtotal,
            id
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error updating sale_item: " + error.message);
    }
}
