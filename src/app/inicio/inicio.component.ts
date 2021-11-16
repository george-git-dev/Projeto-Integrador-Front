import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  usuario: Usuario = new Usuario()
  
  listaPostagens: Postagem[]
  idUsuario = environment.idUsuario

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/login']);
    }

    this.postagemService.refreshToken()
    this.authService.refreshToken()
    this.getAllPostagens()
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })

  }

}
