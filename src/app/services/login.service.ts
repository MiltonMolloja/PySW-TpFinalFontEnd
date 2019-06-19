import { Injectable } from '@angular/core';
import { Usuario } from  './../models/usuario';
import { Observable } from 'rxjs' ;
import { HttpHeaders, HttpClient } from '@angular/common/http' ;
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedIn:boolean = false; //Indica si el usuario esta logueado
  userLogged:Usuario; //Aqui se guardan los datos recuperados.

  constructor(private _http:HttpClient) { }

  public login(username: string, password: string):Observable<any>
  {
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/login',body, httpOption);
  
  }///

  public logout()
  {
    // Remueve el usuario.
    this.userLogged = new Usuario();
    this.userLoggedIn = false;
  }

}
