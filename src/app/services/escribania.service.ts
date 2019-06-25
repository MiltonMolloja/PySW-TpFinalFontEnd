import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Escribania} from './../models/escribania';


@Injectable({
  providedIn: 'root'
})
export class EscribaniaService {

  constructor(private http:HttpClient) {

   }

   public getEscribanias():Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      };
      return this.http.get("http://localhost/PySW-TpFinal/public/index.php/escribania/",
     httpOption);
     
   }

   public addEscribania(escribania){
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      }
      let body = JSON.stringify(escribania);
      return this.http.post("http://localhost/PySW-TpFinal/public/index.php/escribania/new", body,
     httpOption);
     
   }

   public editEscribania(escribania){
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      };
      let body = JSON.stringify(escribania);
      return this.http.post('http://localhost/PySW-TpFinal/public/index.php/escribania/'+escribania.id+'/edit',
       body, httpOption);
   }

   /*public borradoEscribania(escribania){
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      };
      let body = JSON.stringify(escribania);
      return this.http.post('http://localhost/PySW-TpFinal/public/index.php/escribania/'+escribania.id+'/borrado',
       body, httpOption);
   }*/

   public deleteEscribania(id:number){
    return this.http.delete(('http://localhost/PySW-TpFinal/public/index.php/escribania/'+id))
   }

}
