import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { Perfil } from 'src/app/models/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  perfil: Perfil;
  perfiles: Array<Perfil>;

  constructor(private perfilService: PerfilService,public loginService: LoginService) {
    this.perfil = new Perfil();
    this.perfiles = new Array<Perfil>();
    this.mostrarHistoricos();
    this.perfil.apellidos ="HOLA";
    this.perfil.nombres = "Mundo";
    this.perfil.fechaNac = new Date;
    this.perfil.sexo = "XX";
    this.perfil.estado = true;
    console.log(this.perfil);
   }

  ngOnInit() {
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }


  public obtenerPerfiles() {

    this.perfilService.getPerfiles().subscribe(
      results => {
        //console.log(this.escribanos);
        this.perfiles = results;
          console.log(this.perfiles);
        //this.escribanias = JSON.parse(results['escribanias']);
        //console.log(this.escribanias);
      }
    );
  }

  public mostrarHistoricos() {
    //llamamos al metodo del service
    //para cargar los mensajes
    this.perfilService.getPerfiles()
      .subscribe(
        result => {
          this.perfiles = result;
          console.log(this.perfiles);
        },
        error => {
          alert("error en la peticion");
        });
  }

  public borrarPerfil(id: number) {
    this.perfilService.borrarPerfil(id).subscribe(
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

  public enviarPerfil() {
    //this.perfil = new Perfil();
    this.perfil.apellidos ="HOLA";
    this.perfil.nombres = "Mundo";
    //this.perfil.dni = 110;
    this.perfil.fechaNac = new Date;
    this.perfil.sexo = "XX";
    this.perfil.estado = true;
////     console.log("perfil enviar  " + this.perfil);
    this.perfilService.sendPerfil(this.perfil)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
        },
        error => {
          alert("Error en el envio.");
        });
    this.mostrarHistoricos();
    //console.log("agregado correctamente.");
    this.mostrarHistoricos();
  }

  public elegirPerfil(perfil: Perfil) {
    //Creo una copia del mensaje recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    console.log("perfil act  " + perfil);
    console.log("perfil act  This" + this.perfil);
    this.perfil = Object.assign(this.perfil, perfil);
    //se asigna a la propiedad mensaje.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>

  }

  public actualizarPerfil() {
    //seteo nuevamente la fecha actual para el msj modificado

  console.log("perfil act  " + this.perfil);
    this.perfilService.modificarPerfil(this.perfil).subscribe(
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

