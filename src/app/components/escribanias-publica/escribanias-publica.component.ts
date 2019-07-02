import { Component, OnInit } from '@angular/core';
import { EscribaniaService } from '../../services/escribania.service';
import { Escribania } from 'src/app/models/escribania';

@Component({
  selector: 'app-escribanias-publica',
  templateUrl: './escribanias-publica.component.html',
  styleUrls: ['./escribanias-publica.component.css']
})
export class EscribaniasPublicaComponent implements OnInit {
  filtroEscribania:string = "";
  escribania1:Escribania;
  escribanias:Array<Escribania>;
  lat: number = -24.185777;
  lng: number = -65.311159;
  zoom: number = 14;  

  constructor(private escribaniaService:EscribaniaService) {
    this.escribania1=new Escribania();
    this.escribanias=new Array<Escribania>();
    this.getEscribanias();

   }

   public getEscribanias(){
    let escribania:Escribania;
     this.escribaniaService.getEscribanias().subscribe(
      result => {
        this.escribanias = new Array<Escribania>();
        result.forEach
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
      console.log(this.escribanias);
    },
    error => {
      alert("Error al recuperar escribanias.");
    });
  }

  ngOnInit() {
  }

  actualizarMapa( escribania:Escribania )
  {
    this.lat = escribania.latitud;
    this.lng = escribania.longitud;
  }

}
