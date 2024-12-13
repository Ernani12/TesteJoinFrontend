import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Componente de login
import { CategoriasComponent } from './categorias/categorias.component'; // Componente de categorias
import { RouterModule, Routes } from '@angular/router'; // Para configurar as rotas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Configuração das rotas
const appRoutes: Routes = [
  { path: '', component: LoginComponent }, // Rota para login
  { path: 'categorias', component: CategoriasComponent } // Rota para categorias
];

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent, 
    BrowserModule,
    LoginComponent,
    CommonModule,
    FormsModule,
    CategoriasComponent,
    RouterModule.forRoot(appRoutes) // Configuração de rotas
  ],
  providers: [provideHttpClient()],
 


})
export class AppModule { }
