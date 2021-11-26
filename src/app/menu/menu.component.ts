import { Component, Injectable, OnInit } from '@angular/core';
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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nome = environment.nome
  foto = environment.foto
  id = environment.idUsuario

  postagem: Postagem = new Postagem()
  usuario: Usuario = new Usuario()
  tema: Tema = new Tema()
  
  listaPostagens: Postagem[]
  listaTema: Tema[]

  idUsuario = environment.idUsuario
  idTema: number

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/login']);
    }

    this.postagemService.refreshToken()
    this.authService.refreshToken()
    this.temaService.refreshToken()
    this.getAllTemas()
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.idTema = this.idTema
    this.postagem.tema = this.tema

    this.usuario.idUsuario = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
    })
  }

  sair() {
    this.router.navigate(['/login'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.idUsuario = 0
  }

  ocultarRodape() {
    return environment.rodapeOff = true
    
  }

  mostraAdmin() {

    console.log(environment.tipo)
    let admin: boolean = false

    if(environment.tipo == 'adm') {
      admin = true
    }

    return admin;
  }

}
