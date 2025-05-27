import database from "../../db/connetion.js";

export async function findAll() {
    try {
        const query = "SELECT id, name, email, password_hash from users;";
        const statement = database.prepare(query);
        const users = statement.all();
        //statement.finalize();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching users: " + error.message)
    } 
}

export async function create(userData) {
    try {
        const query = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(userData.name, userData.email, userData.password_hash);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating user: " + error.message);
    }
}

export async function remove(id){
    try {
        const query = "DELETE FROM users WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting user: " + error.message);
    }
}

export async function update(id, userData) {
    try {
        const query = "UPDATE users SET name = ?, email = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(userData.name, userData.email, id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating user:" + error.message);
    }
}



export async function updateRole(id, role) {
    try {
        const query = "UPDATE users SET role=? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(role, id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating user:" + error.message);
    }
}