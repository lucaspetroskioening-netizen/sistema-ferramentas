import { conexao } from "@/lib/conexao";
import { Estoque } from "@/classes/Estoque";

export async function listarEstoques() {
  const [resultado] = await conexao.query(
    `SELECT 
      estoques.id,
      estoques.ferramenta_id,
      ferramentas.nome AS ferramenta,
      estoques.quantidade,
      estoques.quantidade_minima,
      estoques.localizacao
    FROM estoques
    INNER JOIN ferramentas ON ferramentas.id = estoques.ferramenta_id`
  );

  return resultado;
}

export async function buscarEstoquePorId(id: number) {
  const [resultado]: any = await conexao.query(
    `SELECT 
      estoques.id,
      estoques.ferramenta_id,
      ferramentas.nome AS ferramenta,
      estoques.quantidade,
      estoques.quantidade_minima,
      estoques.localizacao
    FROM estoques
    INNER JOIN ferramentas ON ferramentas.id = estoques.ferramenta_id
    WHERE estoques.id = ?`,
    [id]
  );

  return resultado[0];
}

export async function cadastrarEstoque(estoque: Estoque) {
  const [resultado]: any = await conexao.query(
    "INSERT INTO estoques (ferramenta_id, quantidade, quantidade_minima, localizacao) VALUES (?, ?, ?, ?)",
    [
      estoque.ferramenta_id,
      estoque.quantidade,
      estoque.quantidade_minima,
      estoque.localizacao
    ]
  );

  return resultado.insertId;
}

export async function editarEstoqueFerramenta(id: number, estoque: Estoque) {
  const [resultado]: any = await conexao.query(
    "UPDATE estoques SET quantidade = ?, quantidade_minima = ?, localizacao = ? WHERE ferramenta_id = ?",
    [
      estoque.quantidade,
      estoque.quantidade_minima,
      estoque.localizacao,
      id
    ]
  );

  return resultado.affectedRows > 0;
}

export async function excluirEstoqueFerramenta(id: number) {
  const [resultado]: any = await conexao.query(
    "DELETE FROM estoques WHERE ferramenta_id = ?",
    [id]
  );

  return resultado.affectedRows > 0;
}
