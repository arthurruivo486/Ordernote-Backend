import database from "../../db/connection.js";

// Criar cliente
export async function createCustomer({ name, phone, address_street, address_number, address_notes, user_id }) {
  try {
    const query = `
      INSERT INTO customers (name, phone, address_street, address_number, address_notes, user_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'));
    `;

    const statement = database.prepare(query);
    const result = statement.run(
      name,
      phone,
      address_street,
      address_number,
      address_notes ?? null,
      user_id
    );

    return result;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}

// Buscar todos clientes (com user_id opcional)
export async function getAllCustomers(userId = null) {
  try {
    let query = "SELECT * FROM customers";
    let params = [];

    if (userId) {
      query += " WHERE user_id = ?";
      params.push(userId);
    }

    query += " ORDER BY id DESC";

    const statement = database.prepare(query);
    return statement.all(...params);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

// Buscar clientes por user_id
export async function getCustomersByUserId(userId) {
  try {
    const query = `
      SELECT * FROM customers
      WHERE user_id = ?
      ORDER BY id DESC;
    `;
    const statement = database.prepare(query);
    return statement.all(userId);
  } catch (error) {
    console.error("Erro ao buscar clientes por user_id:", error);
    throw error;
  }
}

// Buscar cliente por ID
export async function getCustomerById(id, userId = null) {
  try {
    let query = "SELECT * FROM customers WHERE id = ?";
    let params = [id];

    if (userId) {
      query += " AND user_id = ?";
      params.push(userId);
    }

    const statement = database.prepare(query);
    return statement.get(...params);
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    throw error;
  }
}

// Atualizar cliente
export async function updateCustomer(id, data, userId = null) {
  try {
    const query = `
      UPDATE customers
      SET name = ?, phone = ?, address_street = ?, address_number = ?, address_notes = ?, updated_at = datetime('now')
      WHERE id = ?
      ${userId ? "AND user_id = ?" : ""}
    `;

    const params = [
      data.name,
      data.phone,
      data.address_street,
      data.address_number,
      data.address_notes ?? null,
      id,
    ];

    if (userId) params.push(userId);

    const statement = database.prepare(query);
    const result = statement.run(...params);

    return result;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
}

// Deletar cliente
export async function deleteCustomer(id, userId = null) {
  try {
    let query = "DELETE FROM customers WHERE id = ?";
    let params = [id];

    if (userId) {
      query += " AND user_id = ?";
      params.push(userId);
    }

    const statement = database.prepare(query);
    return statement.run(...params);
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
}
