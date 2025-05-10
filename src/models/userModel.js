import database from "../../db/connetion.js";

export async function findAll() {
    try {
        const query = "SELECT id, username, email, password from users;";
        const statement = database.prepare(query);
        const users = statement.all();
        //statement.finalize();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching users: "+error.message)
    } finally{
        database.close();
    }
}