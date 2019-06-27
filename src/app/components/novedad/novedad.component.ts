import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

import { Novedad } from './../../models/novedad';
import {NovedadService} from './../../services/novedad.service';
import { Escribano } from './../../models/escribano';
import { Usuario } from 'src/app/models/usuario';


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

  constructor(private novedadService: NovedadService, public loginService: LoginService) {
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>()
    this.escribano = new Escribano();
    this.escribanos = new Array<Escribano>();
    this.fechaString= "";
    this.getEscribanos();
    this.getNovedades();

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

  public obtenerUsuarios() {
    this.novedadService.getUsuarios().subscribe(
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

  public getEscribanos() {
    this.novedadService.getEscribanos().subscribe(
      result => {
        this.escribanos = result;
        console.log(this.escribano);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public getNovedades() {
    this.novedadService.getNovedades().subscribe(
      result => {
        this.novedades = result;
        console.log(this.novedad);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public initNovedad() {
    this.novedad = new Novedad();
  }

  public addNovedad() {
    this.novedad.fecha = new Date();
    this.novedad.estado = true;
    console.log("this.novedad");
    console.log(this.novedad);
    this.novedadService.addNovedad(this.novedad)
      .subscribe(
        result => {
          console.log("agregado novedad correctamente.");
          this.getNovedades();
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
    this.fechaString = (new Date((novedad.fecha.timestamp)* 1000 )).toISOString().substring(0,10);
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
        this.getNovedades();
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
        this.getNovedades();
        return true;
      },
      error => {
        console.error("Error en eliminar! novedad");
        console.log(error);
        return false;
      }
    )
  }


}
