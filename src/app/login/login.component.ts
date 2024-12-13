import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],

})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/auth/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login bem-sucedido!', response);
          localStorage.setItem('token', response.token);  // Armazena o token no localStorage
          this.router.navigate(['/categorias']);  // Redireciona para a página de categorias
        },
        error: (error) => {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          console.error('Erro de login', error);
        }
      });
  }
}
