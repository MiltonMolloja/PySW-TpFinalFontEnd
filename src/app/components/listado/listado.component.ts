import { Component, OnInit } from '@angular/core';
import { Escribania } from './../../models/escribania';
import { ServEscribanoService  } from './../../services/serv-escribano.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  escribaniaI:Escribania;
  escribanias:Array<Escribania>;

  lat: number = -24.185777;
  lng: number = -65.311159;
  zoom: number = 16;  

  constructor( private escribanoService:ServEscribanoService ) 
  { 
    this.escribaniaI = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.obtenerEscribanias();
  }

  ngOnInit() {
  }

  //Obtiene las escribanias registradas
  obtenerEscribanias()
  {
    let escribania:Escribania;
    this.escribanoService.getEscribanias().subscribe
    (
      (resultados) =>
      {
        this.escribanias = new Array<Escribania>();
        resultados['escribanias'].forEach
        (
          elemento =>
          {
            escribania = new Escribania();
            Object.assign(escribania, elemento);
            if(escribania.estado == true)
            {
              this.escribanias.push(escribania);  
            }
          }
        );
        console.log( this.escribanias );
      },
      error =>
      {
        console.log("Error al recuperar escribanias");
      }
    );
  }///

}
