import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {
<<<<<<< HEAD
  
  getByIdPostagem(id: number) {
    throw new Error('Method not implemented.');
  }
  getAllTema() {
    throw new Error('Method not implemented.');
  }
=======
>>>>>>> 034925c4afe0f786d8956282991dbb034f78b67b

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://projetosinergy.herokuapp.com/postagens/salvar', postagem, this.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://projetosinergy.herokuapp.com/postagens/todos', this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://bloggscabuzzi.herokuapp.com/postagens/atualizar', postagem, this.token)
  }

}
