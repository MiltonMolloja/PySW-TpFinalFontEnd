import { Component, OnInit } from '@angular/core';

import { Escribania } from './../../models/escribania';
import { EscribaniaService } from './../../services/escribania.service';

@Component({
  selector: 'app-gestion-escribania',
  templateUrl: './gestion-escribania.component.html',
  styleUrls: ['./gestion-escribania.component.css']
})
export class GestionEscribaniasComponent implements OnInit {

  type="file";
  link:any;
  files:any;
  rowfiles:any;
  arrayLink:Array<any>;

  title: string = 'My first AGM project';
  lat: number = -24.188430;
  lng: number = -65.299052;

  escribania: Escribania;
  escribanias: Array<Escribania>;

  public submitted = false;

  constructor(private escribaniaService: EscribaniaService) {
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.getEscribanias();

  }

  onSubmit() { 
    this.submitted = true; 
  } 

  ngOnInit() {
  }

  public getEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        result => {
          this.escribanias = result;
          console.log(this.escribanias);
        },
        error => {
          alert("error en la peticion");
        });
  }

  public addEscribania() {
    this.escribaniaService.addEscribania(this.escribania).subscribe(
        result => {
          console.log("Se añadio escribania");
          this.getEscribanias();
        },
        error => {
          alert("Error en añadir escribania");
        });
  }


  public elegirEscribania(escribania:Escribania){
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.escribania = Object.assign(this.escribania, escribania);
  }
   

  public editEscribania(){
    this.escribaniaService.editEscribania(this.escribania).subscribe(
      data => {
      console.log("modificado correctamente escribania")
      //actualizo la tabla de mensajes
      this.getEscribanias();
      return true;
      },
      error => {
      console.error("Error en actualizar escribania");
      console.log(error);
      return false;
      });
  }

  public deleteEscribania(id:number){
    this.escribaniaService.deleteEscribania(id).subscribe(
      result => {
      console.log("borrado correctamente")
      //actualizo la tabla de mensajes
      this.getEscribanias();
      return true;
      },
      error => {
      console.error("Error deleting!");
      console.log(error);
      return false;
      })     
  }
  
 



}