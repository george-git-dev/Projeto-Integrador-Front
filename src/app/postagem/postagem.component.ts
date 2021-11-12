import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar']);
    }

    this.temaService.refreshToken()
  }

}
