import database from "../../db/connection.js";

export function getUserByEmail(email) {
    const statement = database.prepare("SELECT * FROM users WHERE email = ?");
    return statement.get(email);
}
