import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    environment.token = ''; // Sempre que voltar para a pagina cadastrar, o token zera e o usuario deve fazer login novamente
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  cadastrar() {
    this.usuario.foto = 'https://cdn-icons-png.flaticon.com/512/74/74472.png'
    if (this.confirmarSenha.length < 8) {
      this.alertas.showAlertWarning('A senha deve ter no minimo 8 caracteres!');
    } else {
      this.usuario.tipo = this.tipoUsuario;

      if (this.usuario.senha != this.confirmarSenha) {
        this.alertas.showAlertDanger('As senhas estão diferentes!');
      } else {
        this.usuario.userAtivo = true;
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp;
          this.router.navigate(['/login']);
          this.alertas.showAlertSuccess('Cadastro realizado com sucesso!');
        },
        (erro) => {
          if (erro.status == 400) {
            this.alertas.showAlertWarning('E-mail já cadastrado');
          }
        });
      }
    }
  }
}
