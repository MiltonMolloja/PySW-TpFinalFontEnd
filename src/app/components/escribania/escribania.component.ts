import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Escribania } from './../../models/escribania';
import { EscribaniaService } from './../../services/escribania.service';


@Component({
  selector: 'app-escribania',
  templateUrl: './escribania.component.html',
  styleUrls: ['./escribania.component.css']
})
export class EscribaniaComponent implements OnInit {

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

  constructor(private escribaniaService: EscribaniaService, public loginService: LoginService) {
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
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

  public getEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        result => {
          this.escribanias = result;
          console.log(this.escribanias);
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
}
