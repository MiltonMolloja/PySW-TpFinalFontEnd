import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Escribano } from '../models/escribano';

@Injectable({
  providedIn: 'root'
})
export class ServEscribanoService {

  constructor(private _http: HttpClient) { }

  getEscribanias(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/escribania/');
  }

  getEscribanos(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/escribano/');
  }

  public enviarEscribano(escribano:Escribano){
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
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/edit',body, httpOption);
  }
 
  borrarEscribano(escribano:Escribano){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(escribano);
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/escribano/'+escribano.id+'/edit',body, httpOption);
  } 

}
