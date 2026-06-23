import { NextRequest, NextResponse } from "next/server";
import { Estoque } from "@/classes/Estoque";
import {
  listarEstoques,
  cadastrarEstoque
} from "@/data/estoqueData";

export async function GET() {
  const estoques = await listarEstoques();

  return NextResponse.json(estoques, { status: 200 });
}

export async function POST(request: NextRequest) {
  const dados = await request.json();

  const estoque = new Estoque(
    0,
    dados.ferramenta_id,
    dados.quantidade,
    dados.quantidade_minima,
    dados.localizacao
  );

  const erroValidacao = estoque.validar();

  if (erroValidacao) {
    return NextResponse.json(
      { erro: true, mensagem: erroValidacao },
      { status: 400 }
    );
  }

  const idNovoEstoque = await cadastrarEstoque(estoque);

  return NextResponse.json(
    {
      mensagem: "Estoque cadastrado com sucesso.",
      estoque: {
        id: idNovoEstoque,
        ferramenta_id: estoque.ferramenta_id,
        quantidade: estoque.quantidade,
        quantidade_minima: estoque.quantidade_minima,
        localizacao: estoque.localizacao
      }
    },
    { status: 201 }
  );
}
