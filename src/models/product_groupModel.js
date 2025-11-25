import database from '../../db/connection.js';

export async function findAll(userId = null) {
    try {
        let query = "SELECT id, name, icon, user_id FROM product_groups";
        let params = [];
        
        if (userId) {
            query += " WHERE user_id = ?";
            params.push(userId);
        }
        
        query += " ORDER BY name;";
        
        const statement = database.prepare(query);
        const result = statement.all(...params);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching product groups: " + error.message);
    }
}

export async function create(data, userId = null) {
    try {
        const query = "INSERT INTO product_groups (name, icon, user_id) VALUES (?, ?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(data.name, data.icon, userId);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating product group: " + error.message);
    }
}

export async function remove(id, userId = null) {
    try {
        let query = "DELETE FROM product_groups WHERE id = ?";
        let params = [id];
        
        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }
        
        query += ";";
        
        const statement = database.prepare(query);
        const result = statement.run(...params);
        
        if (result.changes === 0) {
            throw new Error("Product group not found or you don't have permission to delete it");
        }
        
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting product group: " + error.message);
    }
}

export async function update(id, data, userId = null) {
    try {
        let query = "UPDATE product_groups SET name = ?, icon = ? WHERE id = ?";
        let params = [data.name, data.icon, id];
        
        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }
        
        query += ";";
        
        const statement = database.prepare(query);
        const result = statement.run(...params);
        
        if (result.changes === 0) {
            throw new Error("Product group not found or you don't have permission to update it");
        }
        
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating product group: " + error.message);
    }
}

// Nova função para buscar grupos por usuário específico
export async function findByUserId(userId) {
    try {
        const query = "SELECT id, name, icon FROM product_groups WHERE user_id = ? ORDER BY name;";
        const statement = database.prepare(query);
        const result = statement.all(userId);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching product groups by user: " + error.message);
    }
}