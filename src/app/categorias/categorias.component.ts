import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  imports: [CommonModule, FormsModule],  // Importando os módulos diretamente no componente
 
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
}

