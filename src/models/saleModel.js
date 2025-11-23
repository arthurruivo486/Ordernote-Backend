import database from "../../db/connection.js";

export async function findAll(userId = null) {
    try {
        let query = "SELECT * FROM sales";
        let params = [];
        
        if (userId) {
            query += " WHERE user_id = ?";
            params.push(userId);
        }
        
        query += " ORDER BY created_at DESC";
        
        const statement = database.prepare(query);
        const sales = statement.all(...params);
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

// ✅ ADICIONE ESTA FUNÇÃO QUE ESTAVA FALTANDO
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

// ✅ ADICIONE TAMBÉM A FUNÇÃO update SE NECESSÁRIO
export async function update(id, saleData) {
    try {
        // Monta dinamicamente os campos que serão atualizados
        const columns = [];
        const values = [];

        for (const key in saleData) {
            if (saleData[key] !== undefined) {
                columns.push(`${key} = ?`);
                values.push(saleData[key]);
            }
        }

        // Atualiza o updated_at sempre
        columns.push(`updated_at = CURRENT_TIMESTAMP`);

        if (columns.length === 0) {
            throw new Error("No valid fields to update");
        }

        const query = `
            UPDATE sales
            SET ${columns.join(", ")}
            WHERE id = ?;
        `;

        const statement = database.prepare(query);

        const result = statement.run(...values, id);
        return result;

    } catch (error) {
        console.log(error);
        throw new Error("Error updating sale: " + error.message);
    }
}
