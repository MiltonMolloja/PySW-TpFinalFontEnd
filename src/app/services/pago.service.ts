import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

}
