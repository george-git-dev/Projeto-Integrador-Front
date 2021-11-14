import {  HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0);

    environment.token = '' // Sempre que voltar para a pagina cadastrar, o token zera e o usuario deve fazer login novamente
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    if (this.confirmarSenha.length < 8) {
      alert('A senha deve ter no minimo 8 caracteres!');
    } else {
      this.usuario.tipo = this.tipoUsuario;

      if (this.usuario.senha != this.confirmarSenha) {
        alert('As senhas estão diferentes!');
      } else {
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp;
          this.router.navigate(['/login']);
          alert('Cadastro realizado com sucesso!')
        })
      }
    }
  }

}
