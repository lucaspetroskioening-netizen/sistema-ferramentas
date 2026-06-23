import { NextResponse } from "next/server";
import { Estoque } from "@/classes/Estoque";
import {
  buscarEstoquePorId,
  editarEstoqueFerramenta,
  excluirEstoqueFerramenta
} from "@/data/estoqueData";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const idEstoque = Number(id);

  const estoque = await buscarEstoquePorId(idEstoque);

  if (!estoque) {
    return NextResponse.json(
      { erro: true, mensagem: "Estoque não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(estoque, { status: 200 });
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const idFerramenta = Number(id);
  const body = await request.json();

  const estoque = new Estoque(
    0,
    idFerramenta,
    body.quantidade,
    body.quantidade_minima,
    body.localizacao
  );

  const erroValidacao = estoque.validar();

  if (erroValidacao) {
    return NextResponse.json(
      { erro: erroValidacao },
      { status: 400 }
    );
  }

  const editou = await editarEstoqueFerramenta(idFerramenta, estoque);

  if (!editou) {
    return NextResponse.json(
      { erro: true, mensagem: "Estoque da ferramenta não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { mensagem: "Estoque da ferramenta atualizado com sucesso." },
    { status: 200 }
  );
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const idFerramenta = Number(id);

  const excluiu = await excluirEstoqueFerramenta(idFerramenta);

  if (!excluiu) {
    return NextResponse.json(
      { erro: true, mensagem: "Estoque da ferramenta não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { mensagem: "Estoque da ferramenta excluído com sucesso." },
    { status: 200 }
  );
}
