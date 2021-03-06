import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Escribano } from '../models/escribano';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class EscribanoService {

  constructor(private _http: HttpClient) { }

  getEscribanias(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/escribania/');
  }

  getEscribanos(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/escribano/');
  }


  getUsuarios(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/usuario/');
  }

  borrarEscribano(id: number){
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/PySW-TpFinal/public/index.php/escribano/'+id));
  }

  public sendEscribano(escribano:Escribano){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(escribano);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/new', body,
    httpOption);
  }

  modificarEscribano(escribano:Escribano){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(escribano);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/edit',
    body, httpOption);
  }

  modificarUsuario(usuario:Usuario){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(usuario);
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+usuario.id+'/editv2',
    body, httpOption);
  }


  borradoDeEscribano(escribano:Escribano){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(escribano);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/borrar',
    body, httpOption);
  }

  modificarUsuarioV2(usuario){
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

  validarMatricula(matricula:number, id:number)
  {
    let idYMatricula:Array<number> = [id, matricula];
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(idYMatricula);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/validacionMatricula',body, httpOption);
  }

}
