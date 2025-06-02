import database from "../../db/connetion.js";

export async function findAll() {
    try {
        const query = "SELECT id, name, description, image_url from products;";
        const statement = database.prepare(query);
        const products = statement.all();
        //statement.finalize();
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching products: " + error.message)
    } 
}

export async function create(productData) {
    try {
        const query = "INSERT INTO products (name, description, image_url) VALUES (?, ?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(productData.name, productData.description, productData.image_url);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error creating product: " + error.message);
    }
}

export async function remove(id){
    try {
        const query = "DELETE FROM products WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting product: " + error.message);
    }
}

export async function update(id, productData) {
    try {
        const query = "UPDATE products SET name = ?, description = ?, image_url = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(productData.name, productData.description, productData.image_url, id);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error updating product:" + error.message);
    }
}