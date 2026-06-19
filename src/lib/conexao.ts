import mysql from "mysql2/promise";

export const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Senha@123",
    database: "integracao_db",
});