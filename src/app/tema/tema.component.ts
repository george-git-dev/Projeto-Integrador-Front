import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  listaTemas: any[];

  constructor(
    private router: Router,
    private temaService: PostagemService
  ) { }

  ngOnInit(){
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar']);
    }
    this.findAllTemas()
    this.temaService.refreshToken()
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Postagem[]) =>{
      this.listaTemas = resp
    })
  }

}
