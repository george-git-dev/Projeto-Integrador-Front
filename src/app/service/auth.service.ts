import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CredenciaisDTO } from '../model/CredenciaisDTO';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  entrar(credenciais: CredenciaisDTO): Observable<CredenciaisDTO> {
    return this.http.post<CredenciaisDTO>(
      'https://projetosinergy.herokuapp.com/usuarios/logar',
      credenciais
    );
  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://blogpessoalpablogen.herokuapp.com/usuarios/cadastrar',
      user
    );
  }

  logado() {
    let ok = false;

    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }
}
