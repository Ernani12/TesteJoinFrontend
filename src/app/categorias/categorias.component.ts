import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = []; // Lista de categorias
  novaCategoria = { nome: '', descricao: '', dataCriacao: '' }; // Categoria para adicionar ou editar
  apiUrl = 'http://localhost:8080/api/categorias/listar'; // Endpoint da API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  // Carregar categorias do endpoint
  carregarCategorias(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
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
    this.http.post(this.apiUrl, this.novaCategoria).subscribe({
      next: (response) => {
        this.carregarCategorias(); // Recarregar lista após adicionar
        this.novaCategoria = { nome: '', descricao: '', dataCriacao: '' }; // Limpar o formulário
      },
      error: (error) => {
        console.error('Erro ao adicionar categoria:', error);
      },
    });
  }

  // Atualizar categoria
  atualizarCategoria(id: number, categoriaAtualizada: any): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.put(url, categoriaAtualizada).subscribe({
      next: (response) => {
        this.carregarCategorias(); // Recarregar lista após atualização
      },
      error: (error) => {
        console.error('Erro ao atualizar categoria:', error);
      },
    });
  }

  // Remover categoria
  removerCategoria(id: number): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.carregarCategorias(); // Recarregar lista após remoção
      },
      error: (error) => {
        console.error('Erro ao remover categoria:', error);
      },
    });
  }
}
