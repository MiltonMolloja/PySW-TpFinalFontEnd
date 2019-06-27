import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Escribano } from '../models/escribano';


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

  borrarEscribano(id: number){
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/PySW-TpFinal/public/index.php/escribano/'+id));
  }

  public sendEscribano(escribano:Escribano){
    //console.log("Send M" + moneda);

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
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/edit',
    body, httpOption);
  }

  
  borradoDeEscribano(escribano:Escribano){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(escribano);
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/borrar',
    body, httpOption);
  }

}
