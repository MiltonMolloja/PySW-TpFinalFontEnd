import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Novedad} from '../models/novedad';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private http: HttpClient) {

  }

  getUsuarios(): Observable<any> {
    return this.http.get('http://localhost/PySW-TpFinal/public/index.php/usuario/');
  }

  public getEscribanos(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get("http://localhost/PySW-TpFinal/public/index.php/escribano/",
      httpOption);
  }

  public getNovedades(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get("http://localhost/PySW-TpFinal/public/index.php/novedad/",
      httpOption);
  }



  public addNovedad(novedad) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(novedad);
    return this.http.post('http://localhost/PySW-TpFinal/public/index.php/novedad/new', body,
      httpOption);
  }

  editNovedad(novedad: Novedad) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(novedad);
    //envio en el body el mensaje transformado en un JSON
    return this.http.post('http://localhost/PySW-TpFinal/public/index.php/novedad/' + novedad.id + '/edit',
      body, httpOption);
  }

  deleteNovedad(id: number){
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this.http.delete(('http://localhost/PySW-TpFinal/public/index.php/novedad/'+id));
  }


}
