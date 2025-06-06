import database from "../../db/connection.js";

export function createCustomer({ name, phone, address_street, address_number, address_notes }) {
  const query = `
    INSERT INTO customers (name, phone, address_street, address_number, address_notes)
    VALUES (?, ?, ?, ?, ?)
  `;
  const statement = database.prepare(query);
  const result = statement.run(name, phone, address_street, address_number, address_notes);
  return result;
}

export function getAllCustomers() {
  const statement = database.prepare("SELECT * FROM customers ORDER BY id DESC");
  return statement.all();
}

export function getCustomerById(id) {
  const statement = database.prepare("SELECT * FROM customers WHERE id = ?");
  return statement.get(id);
}

export function updateCustomer(id, data) {
  const query = `
    UPDATE customers SET
      name = ?,
      phone = ?,
      address_street = ?,
      address_number = ?,
      address_notes = ?
    WHERE id = ?
  `;
  const statement = database.prepare(query);
  return statement.run(data.name, data.phone, data.address_street, data.address_number, data.address_notes, id);
}

export function deleteCustomer(id) {
  const statement = database.prepare("DELETE FROM customers WHERE id = ?");
  return statement.run(id);
}
