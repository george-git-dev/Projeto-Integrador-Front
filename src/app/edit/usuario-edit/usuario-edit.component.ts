import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
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
  tituloPost: string;
  clicou: boolean
  border: string

  listaTema: Tema[];
  nomeTema: string;

  key = 'data'
  reverse = true

  listaPostagens: Postagem[];

  foto = environment.foto;
  nome = environment.nome;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
    environment.rodapeOff = true;
    if (environment.token == '') {
      this.router.navigate(['/login']);
    }
    this.authService.refreshToken();

    this.idUsuario = this.route.snapshot.params['id'];
    this.postagemByIdUsuario();
    // this.findByIdUsuario(this.idUsuario);
    
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  postagemByIdUsuario() {
    this.authService
      .getByIdUsuario(this.idUsuario)
      .subscribe((resp: Usuario) => {
        this.usuario = resp;
      });
  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens();
    } else {
      this.postagemService
        .getByTituloPostagem(this.tituloPost)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  findByNomeTema() {
    if (this.nomeTema == '') {
      this.getAllTemas();
    } else {
      this.temaService
        .getByNomeTema(this.nomeTema)
        .subscribe((resp: Tema[]) => {
          this.listaTema = resp;
        });
    }
  }

  clicado() {
    
    if(this.clicou == true) {
      this.border = '25px'
      this.clicou = false
    } else {
      this.border = '0px'
      this.clicou = true
    }
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
