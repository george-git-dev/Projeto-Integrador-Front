import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaComponent } from './tema/tema.component';
import { PostagemComponent } from './postagem/postagem.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'contato', component: ContatoComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tema', component: TemaComponent },
  { path: 'postagem', component: PostagemComponent },

  { path: 'tema-edit/:id', component: TemaEditComponent },
  { path: 'tema-delete/:id', component: TemaDeleteComponent },
  { path: 'postagem-edit/:id', component: PostagemEditComponent },
  { path: 'postagem-delete/:id', component: PostagemDeleteComponent },
  { path: 'usuario-edit/:id', component: UsuarioEditComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
