import { NextResponse } from "next/server";
import { Ferramenta } from "@/classes/Ferramenta";
import { buscarFerramentaPorId,editarFerramenta, deletarFerramenta } from "@/data/ferramentaData";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request: Request, {params}: Params) {
    const {id} = await params;
    const idFerramenta = Number(id);

    if (isNaN(idFerramenta)){
        return NextResponse.json(
            {erro: "ID inválido."},
            {status: 400}
        );
    };

    const ferramenta = await buscarFerramentaPorId(idFerramenta);

    if (!ferramenta){
        return NextResponse.json(
            {erro: "Ferramenta não encontrada"},
            {status: 404}
        );
    };

    return NextResponse.json(
        ferramenta,
        {status: 200}
    );    
}

export async function PUT(request: Request, {params} : Params) {
    const {id} = await params;
    const idFerramenta = Number(id);
    const body = await request.json();

    if (isNaN(idFerramenta)){
        return NextResponse.json(
            {erro: "ID inválido."},
            {status: 400}
        );
    };

    const ferramenta = new Ferramenta(
        idFerramenta,
        body.nome,
        Number (body.codigo),
        body.setor,
        body.status
    );

    const erro = ferramenta.validar();

    if (erro){
        return NextResponse.json(
            {erro: erro},
            {status: 400}
        );
    }

    const resultado = await editarFerramenta(idFerramenta,ferramenta);

    if (!resultado){
        return NextResponse.json(
            {erro: "Ferramenta não encontrada."},
            {status: 404}
        );
    }

    return NextResponse.json(
        {mensagem: "Ferramenta atualizada com sucesso."},
        {status: 200}
    );
}

export async function DELETE(request: Request, { params }: Params) {
    const { id } = await params;
    const idFerramenta = Number(id);

    if (isNaN(idFerramenta)) {
        return NextResponse.json(
            { erro: "ID inválido." },
            { status: 400 }
        );
    };

    const resultado = await deletarFerramenta(idFerramenta);

    if (!resultado){
        return NextResponse.json(
            {erro: "Ferramenta não encontrada"},
            {status: 404}
        );
    }

    return NextResponse.json(
        {mensagem: "Ferramenta excluida com sucesso."},
        {status: 200}
    );
}