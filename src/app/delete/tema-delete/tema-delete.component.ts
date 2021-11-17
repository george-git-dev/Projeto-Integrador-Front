import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number;

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    window.scroll(0, 0);

    if(environment.token == ''){
      this.router.navigate(['/entrar']);
    }

    this.findAllTemas()

    this.temaService.refreshToken()
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  apagarTema(){
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      alert("Tema deletado.")
      this.router.navigate(['/tema'])
    })
  }

}
