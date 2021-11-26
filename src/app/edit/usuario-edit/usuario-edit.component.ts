import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  clicou: boolean;
  border: string;

  listaTema: Tema[];
  nomeTema: string;
  tema: Tema = new Tema();
  idTema: number;

  key = 'data';
  reverse = true;

  listaPostagens: Postagem[];
  idPostagem: number;
  postagem: Postagem = new Postagem();

  foto = environment.foto;
  nome = environment.nome;
  token = environment.token;
  userId = environment.idUsuario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    environment.rodapeOff = true;

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.authService.refreshToken();

    this.idUsuario = this.route.snapshot.params['id'];
    

    this.getAllPostagens();
    this.postagemByIdUsuario();
    this.getAllTemas();
    
    console.log(this.idUsuario, 'Id quando entra no edit')
    console.log(environment.nome)
    console.log(environment.email)
    console.log(environment.idUsuario)
    console.log(environment.tipo)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      
    console.log(environment.nome)
    console.log(environment.email)
    console.log(environment.idUsuario)
    console.log(environment.tipo)
      this.listaPostagens = resp;
    });
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      
    console.log(this.idTema, 'findByTituloPostagem')
      this.listaTema = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      
    console.log(this.idTema, 'findByTituloPostagem')
      this.tema = resp;
    });
  }

  postagemByIdUsuario() {
    this.authService
      .getByIdUsuario(this.idUsuario)
      .subscribe((resp: Usuario) => {
        
    console.log(this.idTema, 'findByTituloPostagem')
        this.usuario = resp;
      });
  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      
    console.log(this.idTema, 'findByTituloPostagem')
      this.usuario = resp;
    });
  }

  findByIdPostagem(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      
    console.log(this.idTema, 'findByTituloPostagem')
      this.postagem = resp;
    });
  }

  findByTituloPostagem() {
    console.log(this.idTema, 'findByTituloPostagem')
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

  getPostagemById(idPostagem: number) {
    this.postagemService
      .getPostagemById(idPostagem)
      .subscribe((postagem: Postagem) => {
        
    console.log(this.idTema, 'findByTituloPostagem')
        this.postagem = postagem;
        this.nomeTema = postagem.tema.titulo;
      });
  }

  

  // apagarPostagem() {                     // Outro tipo de metodo para deletar
  //   console.log(this.idPostagem)
  //   this.findByIdPostagem(this.idPostagem)
  //   this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
  //     this.alertas.showAlertSuccess('Postagem apagada.');
  //     this.router.navigate(['/inicio']);
  //   });
  // }

  apagarPostagem(idDeletar: number) {
    this.idPostagem = idDeletar;
    this.findByIdPostagem(this.idPostagem);
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.alertas.showAlertSuccess('Postagem apagada.');
      this.postagemByIdUsuario();
    });
    
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
    if (this.clicou == true) {
      this.border = '25px';
      this.clicou = false;
    } else {
      this.border = '0px';
      this.clicou = true;
    }
  }

  atualizarPostagem() {
    if(this.idTema == null){
      this.postagem.tema.titulo == this.nomeTema;
    }else{
      this.tema.idTema = this.idTema;
      this.postagem.tema = this.tema;
    }

    console.log(this.idTema, 'findByTituloPostagem')
    this.postagemService
      .putPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem atualizada!');
        this.postagemByIdUsuario();
        this.idTema = 0
      });
  }

  atualizarUsuario() {
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
