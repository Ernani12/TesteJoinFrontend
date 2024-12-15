import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importando o Router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from './produto.modle'; // Importando o modelo de Produto

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProdutoComponent implements OnInit {
  produtos: any[] = []; // Lista de produtos
  categorias: any[] = []; // Lista de categorias
  novoProduto: Produto = { nome: '', descricao: '', preco: 0, categoriaId: 0 }; // Produto para adicionar ou editar
  apiListarUrl = 'http://localhost:8080/api/produtos/listar'; // Endpoint para listar
  apiSalvarUrl = 'http://localhost:8080/api/produtos/salvarP'; // Endpoint para salvar
  apiDeletarUrl = 'http://localhost:8080/api/produtos/deleteP'; // Endpoint para deletar
  apiListarCategoriasUrl = 'http://localhost:8080/api/categorias/listar'; // Endpoint para listar categorias

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarCategorias();
  }

  // Carregar produtos do endpoint
  carregarProdutos(): void {
    this.http.get<any[]>(this.apiListarUrl).subscribe({
      next: (response) => {
        this.produtos = response;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      },
    });
  }

  // Carregar categorias do endpoint
  carregarCategorias(): void {
    this.http.get<any[]>(this.apiListarCategoriasUrl).subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }

  adicionarProduto(): void {
    this.http.post(this.apiSalvarUrl, this.novoProduto).subscribe({
      next: (response) => {
        console.log('Produto adicionado com sucesso:', response);
        this.carregarProdutos(); // Recarregar a lista de produtos
        this.novoProduto = { nome: '', descricao: '', preco: 0, categoriaId: 0 }; // Limpar o formulário
      },
      error: (error) => {
        console.error('Erro ao adicionar produto:', error);
      },
    });
  }

  editarProduto(id: number): void {
    this.router.navigate([`/editar-produto/${id}`]); // Navegar para a página de edição
  }

  // Remover produto
  removerProduto(id: number): void {
    const url = `${this.apiDeletarUrl}/${id}`; // Usar o endpoint correto
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Produto com ID ${id} removido com sucesso.`);
        this.carregarProdutos(); // Recarregar lista após remoção
      },
      error: (error) => {
        console.error(`Erro ao remover produto com ID ${id}:`, error);
      },
    });
  }

  getCategoriaNome(categoriaId: number | null): string {
    if (!categoriaId) return 'Sem categoria';  // Se não houver categoria, retorna "Sem categoria"
  
    // Verificar se já carregamos a categoria
    const categoria = this.categorias.find((cat) => cat.id === categoriaId);
    if (categoria) {
      return categoria.nome;
    }
  
    // Caso a categoria não tenha sido encontrada, vamos buscar no servidor
    this.buscarCategoriaPorId(categoriaId);
    return 'Carregando...';  // Exibir uma mensagem enquanto carrega
  }

  buscarCategoriaPorId(categoriaId: number): void {
    const url = `http://localhost:8080/api/categorias/listarid/${categoriaId}`; // Endpoint para buscar por ID
    this.http.get<any>(url).subscribe({
      next: (response) => {
        // Atualiza a categoria na lista de categorias
        const categoriaExistente = this.categorias.find(cat => cat.id === categoriaId);
        if (categoriaExistente) {
          categoriaExistente.nome = response.nome; // Atualiza o nome da categoria
        } else {
          this.categorias.push(response); // Se não existir, adiciona nova categoria
        }
      },
      error: (error) => {
        console.error('Erro ao buscar categoria:', error);
      }
    });
  }
  
  
}
