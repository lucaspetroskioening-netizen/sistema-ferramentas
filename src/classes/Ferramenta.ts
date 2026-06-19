export class Ferramenta {
    id: number;
    nome: string;
    codigo: number;
    setor: string;
    status: string;

    constructor(
        id: number,
        nome: string,
        codigo: number,
        setor: string,
        status: string,
    ){
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.setor = setor;
        this.status = status;
    }

    validar(): string | null {
        if (!this.nome || this.nome.trim().length === 0){
            return "O nome é obrigatório preencher"
        }
        if (this.codigo <= 0){
            return "O código é obrigatório preencher"
        }
        if (!this.setor || this.setor.trim().length === 0){
            return "O nome é obrigatório preencher"
        }
        if (!this.status || this.status.trim().length === 0){
            return "O nome é obrigatório preencher"
        }
        
        return null;
    }
}