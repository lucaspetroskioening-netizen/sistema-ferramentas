import { conexao } from "@/lib/conexao";
import { Ferramenta } from "@/classes/Ferramenta";

export async function listarFerramentas() {
  const [resultado] = await conexao.query(
    "SELECT id, nome, codigo, setor, status_ferramenta FROM ferramentas"
  );

  return resultado;
}

export async function buscarFerramentaPorId(id: number) {
  const [resultado]: any = await conexao.query(
    "SELECT id, nome, codigo, setor, status_ferramenta FROM ferramentas WHERE id = ?",
    [id]
  );
  return resultado[0];
}

export async function cadastrarFerramenta(ferramenta: Ferramenta) {
  const [resultado]: any = await conexao.query(
    "INSERT INTO ferramentas (nome, codigo, setor, status_ferramenta) VALUES (?, ?, ?, ?)",
    [
      ferramenta.nome,
      ferramenta.codigo,
      ferramenta.setor,
      ferramenta.status
    ]
  );
  return resultado.insertId;
}

export async function editarFerramenta(id: number, ferramenta: Ferramenta) {
  const [resultado]: any = await conexao.query(
    "UPDATE ferramentas SET nome = ?, codigo = ?, setor = ?, status_ferramenta = ? WHERE id = ?",
    [
      ferramenta.nome,
      ferramenta.codigo,
      ferramenta.setor,
      ferramenta.status,
      id
    ]
  );
  return resultado.affectedRows > 0;
}

export async function excluirFerramenta(id: number) {
  const [resultado]: any = await conexao.query(
    "DELETE FROM ferramentas WHERE id = ?",
    [id]
  );
  return resultado.affectedRows > 0;
}