import { NextRequest, NextResponse } from "next/server";
import { Ferramenta } from "@/classes/Ferramenta";
import {
    listarFerramentas,
    cadastrarFerramenta
} from "@/data/ferramentaData";

export async function GET() {
    const ferramentas = await listarFerramentas();

    return NextResponse.json(ferramentas, { status: 200 });
}

export async function POST(request: NextRequest) {
    const dados = await request.json();

    const ferramenta = new Ferramenta(
        0,
        dados.nome,
        dados.codigo,
        dados.setor,
        dados.status
    );

    const erroValidacao = ferramenta.validar();

    if (erroValidacao) {
        return NextResponse.json(
            { erro: true, mensagem: erroValidacao },
            { status: 400 }
        );
    }

    const idNovaFerramenta = await cadastrarFerramenta(ferramenta);

    return NextResponse.json(
        {
            mensagem: "Ferramenta cadastrada com sucesso.",
            ferramenta: {
                id: idNovaFerramenta,
                nome: ferramenta.nome,
                codigo: ferramenta.codigo,
                setor: ferramenta.setor,
                status: ferramenta.status
            }
        },
        { status: 201 }
    );
}