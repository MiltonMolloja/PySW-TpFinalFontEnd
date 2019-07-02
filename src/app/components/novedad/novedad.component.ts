import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

import { Novedad } from './../../models/novedad';
import {NovedadService} from './../../services/novedad.service';
import { Escribano } from './../../models/escribano';
import { Usuario } from 'src/app/models/usuario';

import * as jspdf from "jspdf";
import { Escribania } from 'src/app/models/escribania';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {

  novedad: Novedad;
  novedades: Array<Novedad>;
  escribano: Escribano;
  escribanos: Array<Escribano>;

  usuario: Usuario;
  usuarios: Array<Usuario>;

  fechaString: string;

  public submitted = false;

  EscribanoLogeado:Escribano;

  constructor(private novedadService: NovedadService, public loginService: LoginService) {
    this.novedad = new Novedad();
    this.novedad.escribano = new Escribano();
    this.novedad.escribano.escribania = new Escribania();
    this.novedades = new Array<Novedad>()
    this.escribano = new Escribano();
    this.escribanos = new Array<Escribano>();
    this.fechaString="";
    //this.loginService.userLogged.username = "socio"

    this.getEscribanos();
    //this.getNovedades();
    this.obtenerEscribanoLogeado();

    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.obtenerUsuarios();



  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
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
    pdf.text("Resumen",80,10);
    pdf.fromHTML(id,30,20);
    pdf.save("archivo.pdf")
  }

  public obtenerUsuarios() {
    this.novedadService.getUsuarios().subscribe(
      result => {
        result.forEach(element => {
          console.log(element.tipo);
          if (element.tipo==="Socio" && element.estado) {
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

  public obtenerEscribanoLogeado() {
    this.novedadService.getUsuarios().subscribe(
      result => {
        this.EscribanoLogeado = new Escribano();
        //this.loginService.userLogged.username = "socio3"
        console.log("this.EscribanoLogeado - Nuveo");
        console.log(this.EscribanoLogeado);
        console.log(this.loginService.userLogged.username);
        result.forEach(element => {
          console.log(element.usename === this.loginService.userLogged.username);
          console.log(element);
          if (element.username === this.loginService.userLogged.username) {
            this.EscribanoLogeado = element.escribano;
            console.log("this.EscribanoLogeado - Logeado");
            console.log(this.EscribanoLogeado);
            this.getNovedadesEscribano(this.EscribanoLogeado);
          }
        });
      },
      error => {
        alert("error en la peticion");
      });
  }

  public getNovedadesEscribano(escribano: Escribano) {
    this.novedadService.getNovedades().subscribe(

      result => {
        this.novedades = new Array<Novedad>();
        //this.novedades = result;
        //console.log(this.novedad);
        result.forEach(element => {
          console.log(this.EscribanoLogeado);
          console.log("this.EscribanoLogeado  +++++++++++++++++++");
          if (element.estado && element.escribano.id == this.EscribanoLogeado.id) {
            this.novedad = new Novedad();
            this.novedad = element;
            this.novedad.fecha =  new Date(element.fecha.timestamp * 1000  + 86400000);
            this.novedades.push(this.novedad);
            //this.novedades.push(element);
          }
        });
      },
      error => {
        alert("error en la peticion");
      });
  }

  public getEscribanos() {
    this.novedadService.getEscribanos()
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

  public getNovedades() {
    this.novedadService.getNovedades().subscribe(
      result => {
        this.novedades = new Array<Novedad>();
        //this.novedades = result;

        result.forEach(element => {
          console.log(element);
          if (element.estado) {
            this.novedad = new Novedad();
            this.escribano = new Escribano();
            this.novedad = element;
            this.escribano = element.escribano;
            this.novedad.fecha =  new Date(element.fecha.timestamp * 1000  + 86400000);
            this.novedad.escribano = this.escribano;
            this.novedades.push(this.novedad);
            //this.novedades.push(element);
          }
        });
      },
      error => {
        alert("error en la peticion");
      });
  }

  public initNovedad() {
    this.novedad = new Novedad();
    this.novedad.escribano = new Escribano();
    this.novedad.escribano.escribania = new Escribania();
  }

  public addNovedad() {
    this.novedad.fecha = new Date();
    this.novedad.estado = true;
    this.obtenerEscribanoLogeado();
    this.novedad.escribano  = this.EscribanoLogeado;
    console.log("this.novedad");
    console.log(this.novedad);
    this.novedadService.addNovedad(this.novedad)
      .subscribe(
        result => {
          console.log("agregado novedad correctamente.");
          ///this.getNovedades();
          this.obtenerEscribanoLogeado();
        },
        error => {
          alert("Error en añadir novedad.");
        });
  }

  public elegirNovedad(novedad) {
    //Creo una copia del novedad recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    ///console.log("this.novedad  - Antes");
    ////console.log(this.novedad);
    this.novedad = Object.assign(this.novedad, novedad);
    ///console.log("this.novedad  - Desp");

    //console.log(((this.novedad.fecha.timestamp)));
    //console.log((new Date((novedad.fecha.timestamp)*1000)).toISOString().substring(0,10) );
    //console.log(JSON.stringify(novedad.fecha));
    ///console.log(JSON.parse((novedad.fecha)));
    //this.novedad.fecha = new Date().setDate(this.novedad.fecha);
    this.fechaString = (new Date((novedad.fecha))).toISOString().substring(0,10);
    this.novedad.fecha= new Date(this.fechaString);

    ///console.log("this.novedad  - Ultimo");
    ///console.log(this.fechaString);
    ///console.log(this.novedad);
    //se asigna a la propiedad novedad.escribano el correspondiente en el
    //array de escribanos, ya que este array es fuente de datos del <select>
    this.novedad.escribano = this.escribanos.find(function (item: Escribano) {
      return item.id === novedad.escribano.id;
    });
  }

  public editNovedad() {
    //seteo nuevamente la fecha actual para el msj modificado
    this.novedad.fecha = new Date(this.fechaString);
    this.novedadService.editNovedad(this.novedad).subscribe(
      data => {
        console.log("modificado novedad correctamente.")
        //actualizo la tabla de novedades
        //this.getNovedades();
        this.obtenerEscribanoLogeado();
        return true;
      },
      error => {
        console.error("Error actualizar! novedad");
        console.log(error);
        return false;
      });
  }

  public deleteNovedad(id: number) {
    this.novedadService.deleteNovedad(id).subscribe(
      result => {
        console.log("borrado novedad correctamente.")
        //actualizo la tabla de mensajes
        //this.getNovedades();
        this.obtenerEscribanoLogeado();
        return true;
      },
      error => {
        console.error("Error en eliminar! novedad");
        console.log(error);
        return false;
      }
    )
  }

    public deleteLogicoNovedad() {
      //seteo nuevamente la fecha actual para el msj modificado
      this.novedad.fecha = new Date(this.fechaString);
      this.novedad.estado = false;
      this.novedadService.editNovedad(this.novedad).subscribe(
        data => {
          console.log("Borrado Logico correctamente.")
          //actualizo la tabla de novedades
          //this.getNovedades();
          this.obtenerEscribanoLogeado();
          return true;
        },
        error => {
          console.error("Error Borrado Logico! novedad");
          console.log(error);
          return false;
        });
    }
}
