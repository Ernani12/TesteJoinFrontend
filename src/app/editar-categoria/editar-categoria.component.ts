import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para acessar os parâmetros da URL
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditarCategoriaComponent implements OnInit {
  categoria: any = { nome: '', descricao: '', dataCriacao: '' };

  // Usando ActivatedRoute para pegar os parâmetros da URL
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Pega o id da URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.carregarCategoria(id);
    }
  }

  carregarCategoria(id: string): void {
    const url = `http://localhost:8080/api/categorias/listarid/${id}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.categoria = response; // Preenche os campos com os dados da categoria
      },
      error: (error) => {
        console.error('Erro ao carregar categoria:', error);
      }
    });
  }

  atualizarCategoria(): void {
    const url = `http://localhost:8080/api/categorias/updateC/${this.categoria.id}`;
    this.http.put(url, this.categoria).subscribe({
      next: (response) => {
        console.log('Categoria atualizada com sucesso', response);
        // Navegar de volta para a página de categorias
        this.router.navigate(['/categorias']);
      },
      error: (error) => {
        console.error('Erro ao atualizar categoria:', error);
      }
    });
  }
}
