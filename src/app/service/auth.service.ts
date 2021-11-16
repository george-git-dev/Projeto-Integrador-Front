import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient // Vai liberar o GET, POST, PUT, DELETE pelo front
  ) { }

    token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }


  entrar(userLogin: CredenciaisDTO): Observable <CredenciaisDTO>{
    return this.http.put<CredenciaisDTO>('https://projetosinergy.herokuapp.com/usuario/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://projetosinergy.herokuapp.com/usuario/salvar', user)

  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('https://projetosinergy.herokuapp.com/usuario/atualizar', usuario, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://projetosinergy.herokuapp.com/usuario/${id}`, this.token)
  }

  logado(){
    let ok:boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }


}
