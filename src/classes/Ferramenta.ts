export class Ferramenta {
  id: number;
  nome: string;
  codigo: string;
  setor: string;
  status: string;

  constructor(
    id: number,
    nome: string,
    codigo: string,
    setor: string,
    status: string
  ) {
    this.id = id;
    this.nome = nome;
    this.codigo = codigo;
    this.setor = setor;
    this.status = status;
  }

  validar(): string | null {
    if (!this.nome || this.nome.trim().length === 0) {
      return "O nome é obrigatório.";
    }

    if (!this.codigo || this.codigo.trim().length === 0) {
      return "O código é obrigatório";
    }

    if (!this.setor || this.setor.trim().length === 0) {
      return "O setor é obrigatório";
    }

    if (!this.status || this.status.trim().length === 0) {
      return "O status é obrigatório";
    }

    return null;
  }
}