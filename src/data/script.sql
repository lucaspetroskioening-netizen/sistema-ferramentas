CREATE DATABASE integracao_db;
USE integracao_db;

CREATE TABLE ferramentas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    setor VARCHAR(100) NOT NULL,
    status_ferramenta VARCHAR(30) NOT NULL
);

INSERT INTO ferramentas (nome, codigo, setor, status_ferramenta) VALUES
('Martelo', 001, 'Manutenção', 'Em uso'),
('Alicarte de pressão', 002, 'Manutenção elétrica', 'Disponivel'),
('Chave de fenda', 003, 'Manutenção mecanica', 'Em uso');

CREATE TABLE estoques (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ferramenta_id INT NOT NULL,
  quantidade INT NOT NULL,
  quantidade_minima INT NOT NULL,
  localizacao VARCHAR(100) NOT NULL,

  FOREIGN KEY (ferramenta_id) REFERENCES ferramentas(id)
);

INSERT INTO estoques (ferramenta_id, quantidade, quantidade_minima, localizacao) VALUES
(1, 20, 5, 'Almoxarifado A'),
(2, 8, 3, 'Almoxarifado B'),
(3, 15, 4, 'Oficina Mecânica');