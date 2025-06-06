import database from '../../db/connetion.js';

export async function findAll() {
    try {
        const query = "SELECT id, name, icon FROM product_groups;";
        const statement = database.prepare(query);
        const result = statement.all();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching product groups: " + error.message);
    }
}

export async function create(data) {
    try {
        const query = "INSERT INTO product_groups (name, icon) VALUES (?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(data.name, data.icon);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating product group: " + error.message);
    }
}

export async function remove(id) {
    try {
        const query = "DELETE FROM product_groups WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting product group: " + error.message);
    }
}

export async function update(id, data) {
    try {
        const query = "UPDATE product_groups SET name = ?, icon = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(data.name, data.icon, id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating product group: " + error.message);
    }
}
