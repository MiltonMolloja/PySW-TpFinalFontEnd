import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from './../models/perfil' ;

@Injectable({
  providedIn: 'root'
})
export class ServPerfilService {

  constructor( private _http:HttpClient ) { }

  public enviarPerfil( perfil:Perfil )
  {
    const httpOption = {
      headers: new HttpHeaders
      ({
      'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(perfil);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/new', body, httpOption);
  }

  public modificarPerfil(perfil:Perfil)
  {
    const httpOption = {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    })
    };
    let body = JSON.stringify(perfil);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+perfil.id+'/edit',body, httpOption);
  }

  public borrarPerfil(perfil:Perfil)
  {
    const httpOption = {
    headers: new HttpHeaders
    ({
      'Content-Type': 'application/json'
    })
    };
    let body = JSON.stringify(perfil);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/usuario/'+perfil.id+'/borrado',body, httpOption);
  } 
  

}
