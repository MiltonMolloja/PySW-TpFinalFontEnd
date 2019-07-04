import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient) { }
 
  getUsuarios(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/usuario/');
  }


  public sendUsuario(usuario:Usuario){

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/new', body,
    httpOption);
  }

  modificarUsuario(usuario){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(usuario);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+usuario.id+'/edit',
    body, httpOption);
  }

  borradoDeUsuario(usuario:Usuario){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(usuario);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+usuario.id+'/borrado',
    body, httpOption);
  }

  validarUsername(username:string, id:number)
  {
    let idYUsername:Array<any> = [id, username];
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(idYUsername);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/validacionUsername',body, httpOption);
  }

  validarCorreo(correo:string, id:number)
  {
    let idYCorreo:Array<any> = [id, correo];
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(idYCorreo);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/validacionCorreo',body, httpOption);
  }

}
