import { Component, OnInit } from '@angular/core';

import { Novedad } from './../../models/novedad';
import {NovedadService} from './../../services/novedad.service';
import { Escribano } from './../../models/escribano';

@Component({
  selector: 'app-gestion-novedad',
  templateUrl: './gestion-novedad.component.html',
  styleUrls: ['./gestion-novedad.component.css']
})
export class GestionNovedadComponent implements OnInit {
  novedad: Novedad;
  novedades: Array<Novedad>;
  escribano: Escribano;
  escribanos: Array<Escribano>;

  public submitted = false;

  constructor(private novedadService: NovedadService) {
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>()
    this.escribano = new Escribano();
    this.escribanos = new Array<Escribano>();
    this.getEscribanos();
    this.getNovedades();

  }

  onSubmit() { 
    this.submitted = true; 
  } 

  ngOnInit() {
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

  public addNovedad() {
    this.novedad.fecha = new Date();
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

  public elegirNovedad(novedad: Novedad) {
    //Creo una copia del novedad recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.novedad = Object.assign(this.novedad, novedad);
    //se asigna a la propiedad novedad.escribano el correspondiente en el
    //array de escribanos, ya que este array es fuente de datos del <select>
    this.novedad.escribano = this.escribanos.find(function (item: Escribano) {
      return item.id === novedad.escribano.id;
    });
  }

  public editNovedad() {
    //seteo nuevamente la fecha actual para el msj modificado
    this.novedad.fecha = new Date();
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
