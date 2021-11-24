import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class EntrarComponent implements OnInit {
  usuarioLogin: CredenciaisDTO = new CredenciaisDTO();

  constructor(
    private auth: AuthService, 
    private router: Router,
    private alertas: AlertasService
    ) {}

  ngOnInit() {
    window.scroll(0, 0);

    environment.token = ''; // Sempre que voltar para a pagina entrar, o token zera e o usuario deve fazer login novamente
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe(
      (resp: CredenciaisDTO) => {
        this.usuarioLogin = resp;
        environment.token = this.usuarioLogin.token;
        environment.idUsuario = this.usuarioLogin.idUsuario;
        environment.nome = this.usuarioLogin.nome;
        environment.email = this.usuarioLogin.email;
        environment.tipo = this.usuarioLogin.tipo;
        environment.foto = this.usuarioLogin.foto;

        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 400) {
          this.alertas.showAlertWarning('Usuário ou senha inválidos!');
        }
      }
    );
  }
}
