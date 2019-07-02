import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Escribania } from './../../models/escribania';
import { Escribano } from './../../models/escribano';
import { EscribaniaService } from './../../services/escribania.service';

import * as jspdf from "jspdf";


@Component({
  selector: 'app-escribania',
  templateUrl: './escribania.component.html',
  styleUrls: ['./escribania.component.css']
})
export class EscribaniaComponent implements OnInit {
  //Usado para filtrar la tabla
  filtroEscribania:string = '';

  type="file";
  link:any;
  files:any;
  rowfiles:any;
  arrayLink:Array<any>;

   //archivo
   imagen_u:any //Se usa any porque es un array con muchos datos y solo interesa la posicion [0].base64


  title: string = 'My first AGM project';
  lat: number = -24.188430;
  lng: number = -65.299052;

  escribania: Escribania;
  escribanias: Array<Escribania>;

  public submitted = false;

  escribanos: Array<Escribano>;
  borrado: boolean;

  constructor(private escribaniaService: EscribaniaService, public loginService: LoginService) {
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.escribanos = new Array<Escribano>();
    this.borrado= true;
    this.getEscribanias();

  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
  }

  convertirYCargar()
  {
    //Se pasa a la imagen del usuario
    this.escribania.foto = this.imagen_u[0].base64;
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

  generarPDF(){
    var id = document.getElementById("tabRegistro");
    var pdf = new jspdf({
      orientacion:'1',
      unit:'pt',
      format: 'carta'
      });
    pdf.text("Resumen de Escribania",80,10);
    pdf.fromHTML(id,30,20);
    pdf.save("archivo.pdf")
  }


  public getEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        result => {
          this.escribanias = new Array<Escribania>();
          result.forEach(element => {
            if(element.estado==true){
              this.escribanias.push(element);
            }
          });
          //this.escribanias = result;
          //console.log(this.escribanias);
        },
        error => {
          alert("error en la peticion");
        });
  }

  public addEscribania() {
    this.escribania.estado= true;
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
      alert("NO se Pudo Modificar...");
      return false;
      });
  }

  public deleteEscribania(id:number){
    console.log(id);
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

  public deleteLogicoEscribania(){
    console.log(this.escribania);
    console.log("this.borrado");
    console.log(this.borrado);
    if (this.borrado) {
      this.escribania.estado = false;
      this.escribaniaService.editEscribania(this.escribania).subscribe(
        data => {
        console.log("Borrado Logico correctamente escribania")
        //actualizo la tabla de mensajes
        this.getEscribanias();
        },
        error => {
        console.error("Error Borrado Logico escribania");
        console.log(error);
        });
    }else{
      alert("error Nose puede Borrar");
    }

  }

  public deleteLogicoEscribaniaValidado(escribania: Escribania){
    this.borrado = true;
    this.escribaniaService.getEscribanos()
      .subscribe(
        result => {
          result.forEach(element => {
            if (element.estado) {
              if (escribania.id === element.escribania.id) {
                this.borrado = false;

                console.log("this.borrado REs + " + this.borrado);
              }
              //
            }
          });
          if (this.borrado) {
            this.deleteLogicoEscribania();
          }else{
            alert("Error Nose puede Borrar - Escribano");
          }
        },
        error => {
          alert("error en la peticion");
        });
  }

  public initEscribania(){
    this.escribania = new Escribania();
  }
}
