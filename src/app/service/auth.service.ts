import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) { }


  entrar(userLogin: CredenciaisDTO): Observable <CredenciaisDTO>{
    return this.http.put<CredenciaisDTO>('https://projetosinergy.herokuapp.com/usuario/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://projetosinergy.herokuapp.com/usuario/salvar', user)

  }

  logado(){
    let ok:boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }


}
