import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class EntrarComponent implements OnInit {
  userLogin: CredenciaisDTO = new CredenciaisDTO();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe(
      (resp: CredenciaisDTO) => {
        this.userLogin = resp;
        environment.token = this.userLogin.token;
        environment.nome = this.userLogin.nome;
        environment.foto = this.userLogin.foto;
        environment.idUsuario = this.userLogin.idUsuario;
        environment.email = this.userLogin.email;
        environment.email = this.userLogin.email;


        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 400) {
          alert('Usuário ou senha estão incorretos!');
        }
      }
    );
  }
}
