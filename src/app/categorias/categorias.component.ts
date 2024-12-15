import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importando o Router


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = []; // Lista de categorias
  novaCategoria = { nome: '', descricao: '', dataCriacao: '' }; // Categoria para adicionar ou editar
  apiListarUrl = 'http://localhost:8080/api/categorias/listar'; // Endpoint para listar
  apiSalvarUrl = 'http://localhost:8080/api/categorias/SalvarC'; // Endpoint para salvar
  apiDeletarUrl = 'http://localhost:8080/api/categorias/deleteC'; // Endpoint para deletar

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  // Carregar categorias do endpoint
  carregarCategorias(): void {
    this.http.get<any[]>(this.apiListarUrl).subscribe({
      next: (response) => {
        this.categorias = response;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }

  // Adicionar nova categoria
  adicionarCategoria(): void {
    this.http.post(this.apiSalvarUrl, this.novaCategoria).subscribe({
      next: (response) => {
        console.log('Categoria adicionada com sucesso:', response);
        this.carregarCategorias(); // Recarregar lista após adicionar
        this.novaCategoria = { nome: '', descricao: '', dataCriacao: '' }; // Limpar o formulário
      },
      error: (error) => {
        console.error('Erro ao adicionar categoria:', error);
      },
    });
  }

  // Atualizar categoria
  editarCategoria(id: number): void {
    this.router.navigate([`/editar-categoria/${id}`]); // Navegar para a página de edição
  }

  // Remover categoria
  removerCategoria(id: number): void {
    const url = `${this.apiDeletarUrl}/${id}`; // Usar o endpoint correto
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Categoria com ID ${id} removida com sucesso.`);
        this.carregarCategorias(); // Recarregar lista após remoção
      },
      error: (error) => {
        console.error(`Erro ao remover categoria com ID ${id}:`, error);
      },
    });
  }
}
