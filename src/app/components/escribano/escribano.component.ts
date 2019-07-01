import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';
import { Escribania } from 'src/app/models/escribania';

import * as jspdf from "jspdf";


@Component({
  selector: 'app-escribano',
  templateUrl: './escribano.component.html',
  styleUrls: ['./escribano.component.css']
})
export class EscribanoComponent implements OnInit {
  escribano: Escribano;
  escribanos: Array<Escribano>;
  escribania: Escribania;
  escribanias: Array<Escribania>;

  public submitted = false;

  constructor(private escribanoService: EscribanoService, public loginService: LoginService) {
    this.escribano = new Escribano();
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.escribanos = new Array<Escribano>();
    this.obtenerEscribanias();
    this.mostrarHistoricos();
   }

   logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

  onSubmit() {
    this.submitted = true;
  }


  ngOnInit() {
  }

  public obtenerEscribanias() {
    this.escribanoService.getEscribanias().subscribe(
      results => {
        this.escribanias = results;
        console.log(this.escribanias);
      }
    );
  }

  public mostrarHistoricos() {
    this.escribanoService.getEscribanos()
      .subscribe(
        result => {
          this.escribanos  = new Array<Escribano>();
          result.forEach(element => {
            if (element.estado) {
              this.escribanos.push(element);
            }
          });
          //this.escribanos = result;
          //console.log(this.escribanos);
        },
        error => {
          alert("error en la peticion");
        });
  }

  public borrarEscribano(id: number) {
    this.escribanoService.borrarEscribano(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de mensajes
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error deleting!");
        console.log(error);
        return false;
      }
    )
  }

  generarPDF(){
    var id = document.getElementById("tabRegistro");
    var pdf = new jspdf({
      orientacion:'1',
      unit:'pt',
      format: 'carta'
      });
    pdf.text("Resumen de Escribanos",80,10);
    pdf.fromHTML(id,30,20);
    pdf.save("archivo.pdf")
  }

  public enviarEscribano() {
    this.escribano.estado  = true;
    this.escribanoService.sendEscribano(this.escribano)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
          this.mostrarHistoricos();
        },
        error => {
          alert("Error en el envio.");
        });
  }

  public elegirEscribano(escribano: Escribano) {
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable



    console.log("slet this" + this.escribano.escribania);
    console.log("slet this" + this.escribano);
    console.log("Selec - " + escribano);
    this.escribano = Object.assign(this.escribano, escribano);
    //se asigna a la propiedad mensaje.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.escribano.escribania = this.escribanias.find(function (item: Escribania) {
      return item.id === escribano.escribania.id;
    });
    console.log("Selec - " + escribano.escribania.nombre);
  }

  public actualizarEscribano() {
    //seteo nuevamente la fecha actual para el msj modificado

    this.escribanoService.modificarEscribano(this.escribano).subscribe(
      data => {
        console.log("modificado correctamente.")
        //actualizo la tabla de mensajes
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error updating!");
        console.log(error);
        return false;
      });
  }

  public borrarLogicoEscribano() {
    this.escribano.estado = false;
    this.escribano.matricula = 9999;
    console.log( this.escribano);
    this.escribanoService.modificarEscribano(this.escribano).subscribe(
      data => {
        console.log("Borrado Logico correctamente.")
        //actualizo la tabla de mensajes
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error Borrado Logico!");
        console.log(error);
        return false;
      });
  }

  public initEscribano(){
    this.escribano = new Escribano();
    this.escribano.escribania = new Escribania();
  }


}
