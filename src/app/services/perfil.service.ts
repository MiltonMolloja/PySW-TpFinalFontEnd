import { Injectable } from '@angular/core';
// Importamos los componentes que vamos a usar
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private _http: HttpClient) { }

  getPerfiles(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/perfil/');
  }

  borrarPerfil(id: number){
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/PySW-TpFinal/public/index.php/perfil/'+id));
  }

  public sendPerfil(perfil){
    //console.log("Send M" + moneda);

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(perfil);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/perfil/new', body,
    httpOption);
  }

  modificarPerfil(perfil:Perfil){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(perfil);
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost:8080/PySW-TpFinal/public/index.php/perfil/'+perfil.id+'/edit',
    body, httpOption);
  }
}
