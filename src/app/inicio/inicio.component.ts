import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUsuario = environment.idUsuario;

  listaPostagens: Postagem[];
  tituloPost: string;
  postagem: Postagem = new Postagem();

  idTema: number;
  listaTema: Tema[];
  nomeTema: string;
  tema: Tema = new Tema();

  clicou: boolean
  border: string

  key = 'date'
  reverse = true

  foto = environment.foto;
  nome = environment.nome;


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    environment.rodapeOff = false
    this.clicou = true
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.postagemService.refreshToken();
    this.authService.refreshToken();
    this.temaService.refreshToken();
    this.getAllPostagens();
    this.getAllTemas();
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  public getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  findByIdUsuario() {
    this.authService
      .getByIdUsuario(this.idUsuario)
      .subscribe((resp: Usuario) => {
        this.usuario = resp;
      });
  }

  publicar() {
    this.tema.idTema = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.idUsuario = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagens();
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
      this.border = '0px'
      this.clicou = false
    } else {
      this.border = '25px'
      this.clicou = true
    }
  }


}
