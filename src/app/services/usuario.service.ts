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
    //envio en el body el moneda transformado en un JSON
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
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+usuario.id+'/borrado',
    body, httpOption);
  }


}
