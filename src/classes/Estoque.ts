export class Estoque {
  id: number;
  ferramenta_id: number;
  quantidade: number;
  quantidade_minima: number;
  localizacao: string;

  constructor(
    id: number,
    ferramenta_id: number,
    quantidade: number,
    quantidade_minima: number,
    localizacao: string
  ) {
    this.id = id;
    this.ferramenta_id = ferramenta_id;
    this.quantidade = quantidade;
    this.quantidade_minima = quantidade_minima;
    this.localizacao = localizacao;
  }

  validar(): string | null {
    if (!this.ferramenta_id || this.ferramenta_id <= 0) {
      return "A ferramenta é obrigatória.";
    }

    if (this.quantidade === undefined || this.quantidade === null) {
      return "A quantidade é obrigatória.";
    }

    if (this.quantidade < 0) {
      return "A quantidade não pode ser negativa.";
    }

    if (this.quantidade_minima === undefined || this.quantidade_minima === null) {
      return "A quantidade mínima é obrigatória.";
    }

    if (this.quantidade_minima < 0) {
      return "A quantidade mínima não pode ser negativa.";
    }

    if (!this.localizacao || this.localizacao.trim().length === 0) {
      return "A localização é obrigatória.";
    }

    return null;
  }
}
