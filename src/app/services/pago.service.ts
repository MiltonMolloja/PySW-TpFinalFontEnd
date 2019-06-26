import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private _http: HttpClient) { }

  getPagos(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/pago/');
  }

  getEscribanos(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/escribano/');
  }

  getUsuarios(): Observable<any> {
    return this._http.get('http://localhost/PySW-TpFinal/public/index.php/usuario/');
  }

  borrarPago(id: number){
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/PySW-TpFinal/public/index.php/pago/'+id));
  }

  public sendPago(pago){
    //console.log("Send M" + moneda);

    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(pago);
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/pago/new', body,
    httpOption);
  }

  modificarPago(pago:Pago){
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = JSON.stringify(pago);
    //envio en el body el moneda transformado en un JSON
    return this._http.post('http://localhost/PySW-TpFinal/public/index.php/pago/'+pago.id+'/edit',
    body, httpOption);
  }

}
