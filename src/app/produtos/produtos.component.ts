import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from './produto.modle';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ProdutoComponent implements OnInit {
  produtos: any[] = [];
  categorias: any[] = [];
  novoProduto: Produto = { nome: '', descricao: '', preco: 0, categoriaId: 0 };
  produto: Produto = { nome: '', descricao: '', preco: 0, categoriaId: 0 };
  apiListarUrl = 'http://localhost:8080/api/produtos/listar';
  apiSalvarUrl = 'http://localhost:8080/api/produtos/salvarP';
  apiDeletarUrl = 'http://localhost:8080/api/produtos/deleteP';
  apiListarCategoriasUrl = 'http://localhost:8080/api/categorias/listar';
  idgetcatname = 'http://localhost:8080/api/produtos/{id}/categoria/nome';
  idgetcatid = 'http://localhost:8080/api/produtos/{id}/categoria/id';

  mensagemErro: string | null = null;
  produtoOriginal: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();  // Carregar produtos
    this.carregarCategorias();  // Carregar categorias
  }

  carregarProdutos(): void {
    this.http.get<any[]>(this.apiListarUrl).subscribe({
      next: (response) => {
        this.produtos = response;

        // Após carregar os produtos, buscar o nome e o ID da categoria de cada produto
        this.produtos.forEach(produto => {
          const produtoId = produto.id;

          // Buscar nome da categoria
          this.http.get<any>(this.idgetcatname.replace('{id}', produtoId.toString())).subscribe({
            next: (categoriaResponse) => {
              produto.categoriaNome = categoriaResponse.nome; // Atribuir nome da categoria
            },
            error: (error) => {
              console.error('Erro ao carregar nome da categoria:', error);
            }
          });

          // Buscar ID da categoria
          this.http.get<any>(this.idgetcatid.replace('{id}', produtoId.toString())).subscribe({
            next: (categoriaResponse) => {
              produto.categoriaId = categoriaResponse.id; // Atribuir ID da categoria
            },
            error: (error) => {
              console.error('Erro ao carregar ID da categoria:', error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      },
    });
  }

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

     // Limpa mensagem de erro
  this.mensagemErro = null;

      // Validações dos campos
  if (!this.novoProduto.nome) {
    this.mensagemErro = 'O campo Nome é obrigatório.';
    return;
  }
  if (!this.novoProduto.descricao) {
    this.mensagemErro = 'O campo Descrição é obrigatório.';
    return;
  }
  if (!this.novoProduto.preco || this.novoProduto.preco <= 0) {
    this.mensagemErro = 'O campo Preço deve ser maior que 0.';
    return;
  }
  if (!this.novoProduto.categoriaId) {
    this.mensagemErro = 'O campo Categoria é obrigatório.';
    return;
  }

  console.log('Produto a ser salvo:', this.novoProduto);

    this.novoProduto.categoriaId = this.novoProduto.categoriaId || 0;
    this.http.post(this.apiSalvarUrl, this.novoProduto).subscribe({
      next: (response) => {
        console.log('Produto adicionado com sucesso:', response);
        this.carregarProdutos();
        this.novoProduto = { nome: '', descricao: '', preco: 0, categoriaId: 0 };
      },
      error: (error) => {
        console.error('Erro ao adicionar produto:', error);
      },
    });
  }

  removerProduto(id: number): void {
    const url = `${this.apiDeletarUrl}/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Produto com ID ${id} removido com sucesso.`);
        this.carregarProdutos();
      },
      error: (error) => {
        console.error(`Erro ao remover produto com ID ${id}:`, error);
      },
    });
  }


  atualizarProduto(): void {
    
  
    // Certifica que os campos de categoria não sejam alterados
    const produtoAtualizado = {
      ...this.novoProduto, // Copia os campos do novo produto
      categoriaId: this.produtoOriginal.categoriaId, // Mantém o ID da categoria original
      categoriaNome: this.produtoOriginal.categoriaNome // Mantém o nome da categoria original
    };
  
    // Realiza a requisição PUT para atualizar o produto
    this.http.put(`${this.apiSalvarUrl}/${this.novoProduto.id}`, produtoAtualizado).subscribe({
      next: (response) => {
        console.log('Produto atualizado com sucesso:', response);
        this.carregarProdutos();
        this.novoProduto = { nome: '', descricao: '', preco: 0, categoriaId: 0 };
      },
      error: (error) => {
        console.error('Erro ao atualizar produto:', error);
      },
    });
  }


  voltarParaCategorias() {
    this.router.navigate(['/categorias']); // Substitua '/categorias' pela rota correta
  }
}
