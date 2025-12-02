import database from "../../db/connection.js";

// 🟦 Buscar todas as variações de um produto
export async function findByProductId(productId, userId = null) {
    try {
        let query = `
            SELECT id, product_id, user_id, name, price, is_active
            FROM product_variations
            WHERE product_id = ?
        `;
        const params = [productId];

        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }

        query += " ORDER BY name;";

        const statement = database.prepare(query);
        return statement.all(...params);
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching variations: " + error.message);
    }
}

// 🟦 Criar variação
export async function create(variationData) {
    try {
        const query = `
            INSERT INTO product_variations (product_id, user_id, name, price, is_active)
            VALUES (?, ?, ?, ?, ?)
        `;

        const statement = database.prepare(query);
        const result = statement.run(
            variationData.product_id,
            variationData.user_id,
            variationData.name,
            variationData.price,
            variationData.is_active ?? true
        );

        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating variation: " + error.message);
    }
}

// 🟦 Deletar variação
export async function remove(id, userId = null) {
    try {
        let query = "DELETE FROM product_variations WHERE id = ?";
        const params = [id];

        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }

        const statement = database.prepare(query);
        const result = statement.run(...params);

        if (result.changes === 0) {
            throw new Error("Variation not found or unauthorized");
        }

        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting variation: " + error.message);
    }
}

// 🟦 Atualizar variação
export async function update(id, variationData, userId = null) {
    try {
        let query = `
            UPDATE product_variations
            SET name = ?, price = ?, is_active = ?
            WHERE id = ?
        `;

        const params = [
            variationData.name,
            variationData.price,
            variationData.is_active,
            id
        ];

        if (userId) {
            query += " AND user_id = ?";
            params.push(userId);
        }

        const statement = database.prepare(query);
        const result = statement.run(...params);

        if (result.changes === 0) {
            throw new Error("Variation not found or unauthorized");
        }

        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating variation: " + error.message);
    }
}
