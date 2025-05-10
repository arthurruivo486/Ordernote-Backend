import Database from "better-sqlite3";

import { dbPath } from "../src/utils/dbpath.js";

console.log("Caminho importado: "+dbPath);

let db = null;

try {
    db = new Database(dbPath, {
        verbose: console.log,
        mode: Database.OPEN_READWRITE | Database.OPEN_CREATE,
    });
    console.log("Banco de dados conectado com sucesso !");
} catch (error) {
    console.log(error);
}

export default db;