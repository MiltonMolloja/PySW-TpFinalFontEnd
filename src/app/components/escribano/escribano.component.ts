import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';
import { Escribania } from 'src/app/models/escribania';

import * as jspdf from "jspdf";
import { Usuario } from 'src/app/models/usuario';

import { PnotifyService } from './../../services/pnotify.service';
import { Perfil } from 'src/app/models/perfil';


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
  usuario: Usuario;
  usuarios: Array<Usuario>;
  public submitted = false;
  pnotify = undefined;

  constructor(private escribanoService: EscribanoService, public loginService: LoginService, pnotifyService: PnotifyService) {
    this.escribano = new Escribano();
    this.escribano.escribania = new Escribania();
    this.escribanos = new Array<Escribano>();
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.usuario = new Usuario();
    this.usuario.escribano = new Escribano();
    this.usuario.perfil = new Perfil();
    this.usuarios = new Array<Usuario>();

    this.obtenerUsuarios();
    this.obtenerEscribanias();
    this.mostrarHistoricos();

    this.pnotify = pnotifyService.getPNotify();
    this.pnotify.defaults.styling = 'bootstrap4';
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
          this.escribano.escribania = new Escribania();
          result.forEach(element => {
            if (element.estado) {
              this.escribano.id = element.id;
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
        this.pnotify.error({
          text: "Se Elimino Correctamente..",
          type: 'Danger'
        });
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
    pdf.save("archivo.pdf");
    this.pnotify.notice({
      text: "Se Genero Archivo PDF Correctamente..",
      type: 'noticer'
    });
  }

  public enviarEscribano() {
    this.escribano.estado  = true;
    this.escribanoService.sendEscribano(this.escribano)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
          this.pnotify.info({
            text: "Se Guardo Correctamtne",
            type: 'info'
          });
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
        this.pnotify.success({
          text: "Se Modificado Correctamente..",
          type: 'success'
        });
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
    //this.escribano.matricula = 9999;
    let escribanoBorrado = this.escribano;
    console.log( this.escribano);
    this.borrarEscrianoDeUsuario(escribanoBorrado);
    console.log("escribanoBorrado");
    console.log(escribanoBorrado);

    this.escribanoService.modificarEscribano(this.escribano).subscribe(
      data => {
        console.log("Borrado Logico correctamente.");
        this.pnotify.error({
          text: "Se Elimino Correctamente..",
          type: 'danger'
        });

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

  public borrarEscrianoDeUsuario(escribano:Escribano){
    this.escribanoService.getUsuarios().subscribe(
      result => {
        console.log(result);
        this.usuario = new Usuario();
        this.usuario.escribano = new Escribano();
        this.usuario.perfil = new Perfil();
        result.forEach(element => {
            console.log(element);
            console.log(escribano.id);
            if (element.escribano  != null){
            if ( element.escribano.id  == escribano.id) {
              this.usuario = element;
              this.usuario.escribano= null;
              this.usuario.estado= false;
              //this.usuario.escribano.matricula= 9999;
              console.log(" this usuario carfaod");
              console.log(this.usuario);

           // console.log(this.usuarios);
          }
        }
        });
        console.log("this.actualizarUsuario();");
        console.log(this.usuario);
        this.modificarUsuarioV2();
      },
      error => {
        alert("error en la peticion");
      });
  }

  public actualizarUsuario() {
    //seteo nuevamente la fecha actual para el msj modificado
    console.log(" -    console.log(usuario); ");
    console.log(this.usuario);
    this.escribanoService.modificarUsuario(this.usuario).subscribe(
      data => {
        console.log("modificado correctamente.")
        //actualizo la tabla de mensajes
        this.pnotify.success({
          text: "Se Modificado Correctamente..",
          type: 'success'
        });
        this.mostrarHistoricos();
        return true;
      },
      error => {
        console.error("Error updating!");
        console.log(error);
        return false;
      });
  }



  public initEscribano(){
    this.escribano = new Escribano();
    this.escribano.escribania = new Escribania();
    this.usuario = new Usuario();
    this.usuario.escribano = new Escribano();
    this.usuario.perfil = new Perfil();
  }

  public obtenerUsuarios() {
    this.escribanoService.getUsuarios().subscribe(
      result => {
        this.usuario = new Usuario();
        this.usuario.escribano = new Escribano();
        result.forEach(element => {
          //console.log(element.tipo);
          if (element.tipo==="Socio" && element.estado) {
            this.usuarios.push(element);
           // console.log(this.usuarios);
          }
        });
        console.log("this.usuarios");
        console.log(this.usuarios);
      },
      error => {
        alert("error en la peticion");
      });
  }

  //Modificar el usuario
  modificarUsuarioV2()
  {
    //Se pregunta si el formulario es valido
    if( 0==0 )
    {
      this.escribanoService.modificarUsuarioV2(this.usuario).subscribe
      (
        resultados => {
          console.log("modificado correctamente usuario.")
          this.pnotify.success({
            text: "Se Modificado Usuario Correctamente..",
            type: 'success'
          });
             return true;
          },
          error => {
          console.error("error al modificar usuario.");
          console.log(error);
          return false;
          }
      );
    }
  }///


}
