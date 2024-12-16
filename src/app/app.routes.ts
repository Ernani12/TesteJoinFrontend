import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ProdutoComponent } from './produtos/produtos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redireciona para login por padrão
  { path: 'categorias', component: CategoriasComponent },  // Rota para Categorias
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutoComponent },  // Rota para Categorias
  { path: 'editar-categoria/:id', component: EditarCategoriaComponent },
  { path: 'editar-produto/:id', component: EditarProdutoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
