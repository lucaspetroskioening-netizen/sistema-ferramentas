import { NextRequest, NextResponse } from "next/server";
import { Ferramenta } from "@/classes/Ferramenta";
import {
  buscarFerramentaPorId,
  editarFerramenta,
  excluirFerramenta
} from "@/data/ferramentaData";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request: Request, {params}: Params) {
    const { id } = await params;
    const idFerramenta = Number(id);

    if (isNaN(idFerramenta)){
        return NextResponse.json(
            {erro: "Id inválido"},
            {status: 400}
        );
    };

    const ferramenta = await buscarFerramentaPorId(idFerramenta);

    if (!ferramenta) {
      return NextResponse.json(
        { erro: true, mensagem: "Ferramenta não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(ferramenta, { status: 200 });
}

export async function PUT(request: Request, {params}: Params) {
    const { id } = await params;
    const idFerramenta = Number(id);
    const body = await request.json();

    const ferramenta = new Ferramenta(
      idFerramenta,
      body.nome,
      body.codigo,
      body.setor,
      body.status
    );

    const erroValidacao = ferramenta.validar();

    if (erroValidacao) {
      return NextResponse.json(
        { erro: erroValidacao },
        { status: 400 }
      );
    }

    const editou = await editarFerramenta(idFerramenta, ferramenta);

    if (!editou) {
      return NextResponse.json(
        { erro: true, mensagem: "Ferramenta não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensagem: "Ferramenta atualizada com sucesso." },
      { status: 200 }
    );
}

export async function DELETE(request: Request, {params}: Params) {
    const { id } = await params;
    const idFerramenta = Number(id);

    const excluiu = await excluirFerramenta(idFerramenta);

    if (!excluiu) {
      return NextResponse.json(
        { erro: true, mensagem: "Ferramenta não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { mensagem: "Ferramenta excluída com sucesso." },
      { status: 200 }
    );
}