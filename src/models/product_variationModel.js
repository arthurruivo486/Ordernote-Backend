import database from "../../db/connetion.js";

export async function findAll() {
    try {
        const query = "SELECT id, product_id, name, price, stock, created_at, updated_at FROM product_variations;";
        const statement = database.prepare(query);
        const product_variations = statement.all();

        return product_variations;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching product_variations: " + error.message)
    }
}

export async function create(product_variationData) {
    try {
        const query = "INSERT INTO product_variations (product_id, name, price, stock) VALUES (?, ?, ?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(
            product_variationData.product_id,
            product_variationData.name,
            product_variationData.price,
            product_variationData.stock
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating product_variation: " + error.message);
    }
}

export async function remove(id) {
    try {
        const query = "DELETE FROM product_variations WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting product_variation: " + error.message);
    }
}

export async function update(id, product_variationData) {
    try {
        const query = "UPDATE product_variations SET product_id = ?, name = ?, price = ?, stock = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(
            product_variationData.product_id,
            product_variationData.name,
            product_variationData.price,
            product_variationData.stock,
            id
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating product_variation:" + error.message);
    }
}