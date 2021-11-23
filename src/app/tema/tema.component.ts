import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema();
  listaTemas: Tema[];
  nome = environment.nome;

  constructor(private router: Router, private temaService: TemaService) {}

  ngOnInit() {
    environment.rodapeOff = true
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.temaService.refreshToken();

    this.tema.criador = this.nome;

    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  cadastrar() {
    this.tema.criador = this.nome
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      alert('Tema cadastrado com sucesso!');
      this.findAllTemas();
      this.tema = new Tema();
      
    });
  }
}
