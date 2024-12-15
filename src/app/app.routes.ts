import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redireciona para login por padrão
  { path: 'categorias', component: CategoriasComponent },  // Rota para Categorias
  { path: 'login', component: LoginComponent },
  { path: 'editar-categoria/:id', component: EditarCategoriaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
