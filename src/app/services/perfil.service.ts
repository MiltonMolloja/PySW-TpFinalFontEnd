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

  public sendPerfil(perfil:Perfil){

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
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/perfil/'+perfil.id+'/edit',
    body, httpOption);
  }

  borradoDePerfil(perfil:Perfil){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(perfil);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/perfil/'+perfil.id+'/borrado',
    body, httpOption);
  }

  validarDni(dni:number, id:number)
  {
    let idYDni:Array<number> = [ id, dni ];
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(idYDni);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/perfil/validacionDocumento',body, httpOption); 
  }


}
