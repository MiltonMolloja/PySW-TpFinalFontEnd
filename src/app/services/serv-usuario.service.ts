import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServUsuarioService {

  constructor( private _http:HttpClient ) { }

  public obtenerUsuarios():Observable<any>
  {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/usuario');
  }

  public enviarUsuario( usuario:Usuario )
  {
    const httpOption = {
      headers: new HttpHeaders
      ({
      'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/new', body, httpOption);
  }

  public modificarUsuario(usuario:Usuario)
  {
    const httpOption = {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    })
    };
    let body = JSON.stringify(usuario);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+usuario.id+'/edit',body, httpOption);
  }

  public borrarUsuario(usuario:Usuario)
  {
    const httpOption = {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    })
    };
    let body = JSON.stringify(usuario);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+usuario.id+'/borrado',body, httpOption);
  }

}