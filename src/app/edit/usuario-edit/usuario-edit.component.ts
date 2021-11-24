import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
    environment.rodapeOff = true;
    if (environment.token == '') {
      this.router.navigate(['/login']);
    }
    this.authService.refreshToken();

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.idUsuario);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  atualizar() {
    if (this.confirmarSenha.length < 8) {
      this.alertas.showAlertWarning('A senha deve ter no minimo 8 caracteres!');
    } else {
      this.usuario.tipo = this.tipoUsuario;

      if (this.usuario.senha != this.confirmarSenha) {
        this.alertas.showAlertDanger('As senha estão incorretas');
      } else {
        this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp;
          this.router.navigate(['/inicio']);
          this.alertas.showAlertSuccess(
            'Usuário atualizado com sucesso, faça o login novamente.'
          );
          environment.token = '';
          environment.nome = '';
          environment.foto = '';
          environment.idUsuario = 0;
          this.router.navigate(['/login']);
        });
      }
    }
  }
}
