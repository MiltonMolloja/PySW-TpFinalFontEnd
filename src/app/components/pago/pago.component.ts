import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/pago';
import { Escribano } from 'src/app/models/escribano';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { Usuario } from 'src/app/models/usuario';

import * as jspdf from "jspdf";

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})



export class PagoComponent implements OnInit {
  pago: Pago;
  pagos: Array<Pago>;
  escribano: Escribano;
  escribanos: Array<Escribano>;
  usuario: Usuario;
  usuarios: Array<Usuario>;

  fechaString :string;

  constructor(private pagoService: PagoService, public loginService: LoginService) {
    this.escribano = new Escribano();
    this.escribanos = new Array<Escribano>();
    this.pago = new Pago();
    this.pagos = new Array<Pago>();
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.fechaString="";
    this.obtenerEscribanos();
    this.mostrarHistoricos();
    this.obtenerUsuarios();
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
    pdf.text("Resumen De Pagos",80,10);
    pdf.fromHTML(id,30,20);
    pdf.save("archivo.pdf")
  }


  ngOnInit() {
  }

  public obtenerEscribanos() {
    this.pagoService.getEscribanos().subscribe(
      results => {
        //console.log(this.escribanos);
        this.escribanos = results;
        //console.log(this.escribanos);
        //this.escribanias = JSON.parse(results['escribanias']);
        //console.log(this.escribanias);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerUsuarios() {
    this.pagoService.getUsuarios().subscribe(
      result => {
        result.forEach(element => {
          console.log(element.tipo);
          if (element.tipo==="Socio") {
            this.usuarios.push(element);
            console.log(this.usuarios);
          }
        });
        console.log(this.escribanos);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public mostrarHistoricos() {
    //llamamos al metodo del service
    //para cargar los mensajes
    this.pagoService.getPagos()
      .subscribe(
        result => {
          this.pagos = new Array<Pago>();
          //this.pagos = result;
          result.forEach(element => {

            if (element.estado) {
              this.pago = new Pago();
              this.pago = element;
              this.pago.fecha = new Date(element.fecha.timestamp * 1000  + 86400000);
              this.pagos.push(element);
            }
          });
          console.log(this.pagos);
        },
        error => {
          alert("error en la peticion");
        });
  }



  public borrarPago(id: number) {
    this.pagoService.borrarPago(id).subscribe(
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
    this.pago = new Pago();
  }

  public enviarPago() {
    //this.pago = new Pago();
    //this.escribano = new Escribano();
    this.pago.fecha = new Date();
    this.pago.estado = true;
    this.pago.escribano = this.escribano;
    console.log(this.pago);
    this.pagoService.sendPago(this.pago)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
          this.mostrarHistoricos();
        },
        error => {
          alert("Error en el envio.");
        });
    this.mostrarHistoricos();
    this.mostrarHistoricos();
    this.pago = new Pago();
  }

  public elegirPago(pago) {
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    console.log("pago");
    console.log(pago);

    this.pago = Object.assign(this.pago, pago);

    this.fechaString = (new Date(pago.fecha).toISOString().substring(0,10));
    this.pago.fecha= new Date(this.fechaString);
    //se asigna a la propiedad mensaje.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.pago.escribano = this.escribanos.find(function (item: Escribano) {

      return item.id === pago.escribano.id;
    });
    this.escribano = this.pago.escribano;
    console.log("pago.escribano");
    console.log(pago.escribano);

  }

  public actualizarPago() {
    //seteo nuevamente la fecha actual para el msj modificado

    console.log("this.pago");
    this.pago.fecha = new Date(this.fechaString);
    console.log(this.pago);
    this.pagoService.modificarPago(this.pago).subscribe(
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
      this.pago = new Pago();
  }

  public borrarLogicoPago() {
    this.pago.estado = false;
    this.pagoService.modificarPago(this.pago).subscribe(
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
      this.pago = new Pago();
  }
}
