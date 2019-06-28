import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

import * as jspdf from "jspdf";
import { NovedadService } from 'src/app/services/novedad.service';
import { Novedad } from 'src/app/models/novedad';
import { Escribano } from 'src/app/models/escribano';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css']
})
export class SocioComponent implements OnInit {
  novedad: Novedad;
  novedades: Array<Novedad>;
  escribano: Escribano;
  escribanos: Array<Escribano>;

  usuario: Usuario;
  usuarios: Array<Usuario>;

  fechaString: string;
  EscribanoLogeado:Escribano;

  public submitted = false;
  constructor(private novedadService: NovedadService,public loginService: LoginService) {
    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>()
    this.escribano = new Escribano();
    this.EscribanoLogeado = new Escribano();
    this.escribanos = new Array<Escribano>();
    this.fechaString= "";
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.obtenerEscribanoLogeado();
    this.getNovedades();
    //this.obtenerUsuarios();

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
          }
        });
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
        this.novedades = new Array<Novedad>();
        //this.novedades = result;
        //console.log(this.novedad);
        result.forEach(element => {
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

  public initNovedad() {
    this.novedad = new Novedad();
  }

}
