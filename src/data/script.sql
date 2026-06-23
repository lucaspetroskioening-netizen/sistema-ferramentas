CREATE DATABASE integracao_db;
USE integracao_db;

CREATE TABLE ferramentas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    setor VARCHAR(100) NOT NULL,
    status_ferramenta VARCHAR(30) NOT NULL
);