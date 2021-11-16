import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
  
  getByIdPostagem(id: number) {
    throw new Error('Method not implemented.');
  }
  getAllTema() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllTemas(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://bloggscabuzzi.herokuapp.com/postagens/todos', this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://bloggscabuzzi.herokuapp.com/postagens/atualizar', postagem, this.token)
  }

}
