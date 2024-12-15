import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para acessar os parâmetros da URL
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
  imports: [CommonModule, FormsModule],
})
export class EditarProdutoComponent implements OnInit {
  produto: any = { nome: '', descricao: '', preco: 0, dataCriacao: '' };

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
      this.carregarProduto(id);
    } else {
      console.error('ID do produto não encontrado na URL');
    }
  }

  carregarProduto(id: string): void {
    const url = `http://localhost:8080/api/produtos/listarid/${id}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.produto = response; // Preenche os campos com os dados do produto
      },
      error: (error) => {
        console.error('Erro ao carregar produto:', error);
      },
    });
  }

  atualizarProduto(): void {
    const url = `http://localhost:8080/api/produtos/updateP/${this.produto.id}`;
    this.http.put(url, this.produto).subscribe({
      next: (response) => {
        console.log('Produto atualizado com sucesso', response);
        // Navegar de volta para a página de produtos
        this.router.navigate(['/produtos']);
      },
      error: (error) => {
        console.error('Erro ao atualizar produto:', error);
      },
    });
  }
}
