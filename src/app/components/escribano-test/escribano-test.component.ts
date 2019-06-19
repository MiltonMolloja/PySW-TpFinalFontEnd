import { Component, OnInit } from '@angular/core';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';
import { Escribania } from 'src/app/models/escribania';

@Component({
  selector: 'app-escribano-test',
  templateUrl: './escribano-test.component.html',
  styleUrls: ['./escribano-test.component.css']
})
export class EscribanoTestComponent implements OnInit {

  escribano: Escribano;
  escribanos: Array<Escribano>;
  escribania: Escribania;
  escribanias: Array<Escribania>;



  constructor(private escribanoService: EscribanoService) {
    this.escribano = new Escribano();
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.escribanos = new Array<Escribano>();
    this.obtenerEscribanias();
    console.log(this.escribanias);
    this.mostrarHistoricos();
    console.log(this.escribanos);
   }

  ngOnInit() {
  }


  public obtenerEscribanias() {

    this.escribanoService.getEscribanias().subscribe(
      results => {
        //console.log(this.escribanos);
        this.escribanias = results;
          console.log(this.escribanias);
        //this.escribanias = JSON.parse(results['escribanias']);
        //console.log(this.escribanias);
      }
    );
  }

  public mostrarHistoricos() {
    //llamamos al metodo del service
    //para cargar los mensajes
    this.escribanoService.getEscribanos()
      .subscribe(
        result => {
          this.escribanos = result;
          console.log(this.escribanos);
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

  public enviarEscribano() {
    this.escribania = new Escribania();
    this.escribano = new Escribano();
    this.escribanoService.sendEscribano(this.escribano)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
        },
        error => {
          alert("Error en el envio.");
        });
  }

  public elegirEscribano(escribano: Escribano) {
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.escribano = Object.assign(this.escribano, escribano);
    //se asigna a la propiedad mensaje.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.escribano.escribania = this.escribanias.find(function (item: Escribania) {
      return item.id === escribano.escribania.id;
    });
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


}
