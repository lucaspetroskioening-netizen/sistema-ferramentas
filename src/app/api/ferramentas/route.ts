import { NextResponse } from "next/server";
import { Ferramenta } from "@/classes/Ferramenta";
import { listarFerramentas, cadastrarFerramenta } from "@/data/ferramentaData";
import { afterEach } from "node:test";

export async function GET() {
    const ferramentas = await listarFerramentas();
    
    return NextResponse.json(ferramentas,{status: 200});
}

export async function POST(request: NextResponse) {
    const body = await request.json();

    const ferramenta = new Ferramenta(
        0,
        body.nome,
        Number(body.codigo),
        body.setor,
        body.status
    );

    const erro = ferramenta.validar();

    if(erro) {
        return NextResponse.json(
            {erro: erro},
            {status: 400}
        );
    }

    const idNovaFerramenta = await cadastrarFerramenta(ferramenta);

    return NextResponse.json(
        {
            mensagem: "Ferramenta cadastrada com sucesso.",
            id: idNovaFerramenta
        },
        {status: 201}
    );
}