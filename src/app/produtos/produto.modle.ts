export interface Produto {
    id?: number; // Opcional, pois um novo produto ainda não terá ID
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: number; // Referência para a categoria
  }
  