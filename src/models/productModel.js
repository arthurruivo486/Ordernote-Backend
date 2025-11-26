import database from "../../db/connection.js";

export async function findAll(userId = null) {
    try {
        let query = "SELECT id, name, description, image_url, price, stock, group_id, user_id FROM products";
        let params = [];
        
        if (userId) {
            query += " WHERE user_id = ?";
            params.push(userId);
        }
        
        query += " ORDER BY name;";
        
        const statement = database.prepare(query);
        const products = statement.all(...params);
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching products: " + error.message)
    }
}

export async function create(productData) {
    try {
        const query = `
      INSERT INTO products (name, description, image_url, price, stock, group_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
        const statement = database.prepare(query);
        const result = statement.run(
            productData.name,
            productData.description,
            productData.image_url,
            productData.price,
            productData.stock,
            productData.group_id,
            productData.user_id // ✅ Incluir user_id
        );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating product: " + error.message);
    }
}

export async function remove(id, userId = null) {
    try {
        let query = "DELETE FROM products WHERE id = ?";
        let params = [id];
        
        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }
        
        query += ";";
        
        const statement = database.prepare(query);
        const result = statement.run(...params);
        
        if (result.changes === 0) {
            throw new Error("Product not found or you don't have permission to delete it");
        }
        
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting product: " + error.message);
    }
}

export async function update(id, productData, userId = null) {
    try {
        let query = "UPDATE products SET name = ?, description = ?, image_url = ?, price = ?, stock = ?, group_id = ? WHERE id = ?";
        let params = [
            productData.name,
            productData.description,
            productData.image_url,
            productData.price,
            productData.stock,
            productData.group_id,
            id
        ];
        
        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }
        
        query += ";";
        
        const statement = database.prepare(query);
        const result = statement.run(...params);
        
        if (result.changes === 0) {
            throw new Error("Product not found or you don't have permission to update it");
        }
        
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating product:" + error.message);
    }
}

// ✅ Nova função para buscar produtos por usuário específico
export async function findByUserId(userId) {
    try {
        const query = "SELECT id, name, description, image_url, price, stock, group_id, user_id FROM products WHERE user_id = ? ORDER BY name;";
        const statement = database.prepare(query);
        const result = statement.all(userId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching products by user: " + error.message);
    }
}