import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { Pago } from 'src/app/models/pago';
import { Escribano } from 'src/app/models/escribano';
import { Usuario } from 'src/app/models/usuario';


import * as jspdf from "jspdf";

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {
  pago: Pago;
  escribano: Escribano;
  pagos: Array<Pago>;
  escribanos: Array<Escribano>;
  usuario: Usuario;
  usuarios: Array<Usuario>;
  totalPagos: number;
  totalPagosEscribano: number;
  totalPagosDosFechas: number;
  totalPagosDosFechasMasEscribano: number;
  mes:number;
  anio:number;

  fechaInicio: Date;
  fechaFin: Date;
  fechaActual: Date = new Date();

  constructor(public loginService: LoginService, private pagoService: PagoService) {
    this.pago = new Pago();
    this.escribano = new Escribano();
    this.pagos = new Array<Pago>();
    this.escribanos = new Array<Escribano>();
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>();
    this.totalPagos = 0;
    this.totalPagosEscribano = 0;
    this.totalPagosDosFechas = 0;
    this.totalPagosDosFechasMasEscribano = 0;
    this.mes = 0;
    this.anio = 0;
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.fechaActual = new Date();
    //this.mostrarHistoricos();
    //this.obtenerEscribanos();
    //this.obtenerUsuarios();
    //this.obtenerTotalPagosTodo();
    //this.obtenerTotalPagosEscribano(this.escribano);
    //this.obtenerTotalPagosDosFechas(this.fechaInicio, this.fechaFin);

    //
    this.obtenerEscribanos2();
    this.obtenerUsuarios2();
    this.mostrarHistoricos2();
    this.obtenerTotalPagosTodo2();
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

  ngOnInit() {
  }

  logout() {
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

  //Aqui comienza
  //Recupera los escribanos de la base de datos
  public obtenerEscribanos2()
  {
    this.pagoService.getEscribanos().subscribe
    (
      results =>
      {
        this.escribanos = results;
      },
      errors =>
      {
        alert("Error al recuperar escribanos.");
      }
    );
  }///

  //Obtiene los usuarios de la base de datos
  public obtenerUsuarios2()
  {
    this.pagoService.getUsuarios().subscribe
    (
      results => 
      {
        results.forEach
        (
          element => {
            if(element.tipo === "Socio" && element.escribano.estado )
            {
              this.usuarios.push(element);
            }
          }
        );
      },
      error =>  
      {
        alert("Error al recuper usuarios.");
      }
    );
  }///

  //Obtiene todos los pagos registrados
  public mostrarHistoricos2()
  {
    this.pagos = new Array<Pago>();
    this.pagoService.getPagos().subscribe
    (
      results =>
      {
        results.forEach(element => 
        {
          if( element.estado )
          {
            this.pagos.push(element);
          }
        });
      },
      error =>
      {
        alert("Error al recuperar pagos.");
      }
    );
  }///

  //Obtiene todos los pagos de un escribano
  public mostrarHistoricosEscribano2(escribano:Escribano) 
  {
    this.pagoService.getPagos().subscribe
    (
      result => 
      {
        this.pagos = new Array<Pago>();
        result.forEach(element => {
          if( element.escribano.id == escribano.id && element.estado )
          {
            this.pagos.push(element);
          }  
        });
      },
      error =>
      {
        alert("Error al recuperar los pagos de un escribano");
      }
    );
  }///

  //Obtiene el total de todos los pagos
  public obtenerTotalPagosTodo2() 
  {
    this.totalPagos = 0;
    this.pagoService.getPagos().subscribe
    (
      result =>
      {
        result.forEach(element => {
          this.totalPagos += parseFloat(element.importe);          
        });
      },
      error =>
      {
        alert("Error al recuperar pagos para obtener total.");
      }
    );
  }///

  //Obtiene todo los pagos de un escribano
  public obtenerTotalPagosEscribano2(escribano: Escribano) 
  {
    this.totalPagosEscribano = 0;
    this.pagoService.getPagos().subscribe(
      result => {
        result.forEach(element => {
          if (escribano.id == parseInt(element.escribano.id) && element.estado) {
            this.totalPagosEscribano += parseFloat(element.importe);
          }
        });
      },
      error => {
        alert("Error al recuperar los pagos de un escribano.");
      });
  }//

  //Obtiene el total de pagos entre dos fechas.
  public obtenerTotalPagosDosFechasDetallado2(fechaInicio: Date, fechaFin: Date)
  {
    fechaInicio = new Date("2019-02-20");
    fechaFin = new Date("2019-11-25");
    this.addDays(fechaInicio, 1);
    this.addDays(fechaFin, 1);
    for (let index = fechaInicio; index <= fechaFin; this.addDays(index, 1)) {
      //      console.log("INT - " + index.toString());
    }
  }///

  //Obtiene el pago entre 2 fechas
  public obtenerTotalPagosDosFechas2(fechaInicio: Date, fechaFin: Date) 
  {
    this.pagoService.getPagos().subscribe
    (
      result =>
      {
        this.totalPagosDosFechas = 0;
        this.pagos = new Array<Pago>();
        result.forEach(element => 
          {
            if (new Date(fechaInicio) <= new Date(element.fecha.timestamp * 1000 ) && new Date(fechaFin) >= new Date(element.fecha.timestamp * 1000 )) 
            {
              if (element.estado) 
              {
                this.totalPagosDosFechas+= element.importe - 1 + 1;
                this.pagos.push(element);
              }
            }
          }
        );
      },
      error =>
      {
        alert("Error al recuperar pagos.");
      }
    ); 
  }//

  public obtenerTotalPagosDosFechasMasEscribano2(fechaInicio: Date, fechaFin: Date, escribano: Escribano)
  {
    fechaInicio = new Date("2019-03-20");
    fechaFin = new Date("2019-08-25");
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = result;
        result.forEach(element => {
          if (fechaInicio <= new Date(element.fecha.timestamp * 1000 ) && fechaFin >= new Date(element.fecha.timestamp * 1000 ))
          {
            if (element.escribano.id === escribano.id)
            {
              if (element.estado)
              {
              this.totalPagosDosFechas+= element.importe - 1 + 1;
              }
            }
          }
        });
      },
      error => {
        alert("Erro al recuperar los pagos de un escribano entre 2 fechas.");
      });
  }///  



  //Aqui finaliza
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
     //this.obtenerTotalPagosTodo();
  }

  public obtenerUsuarios() {
    this.pagoService.getUsuarios().subscribe(
      result => {
        result.forEach(element => {
          //console.log(element.tipo);
          if (element.tipo==="Socio" && element.escribano.estado) {
            this.usuarios.push(element);
            //console.log(this.usuarios);
          }
        });
        ///console.log(this.escribanos);
      },
      error => {
        alert("error en la peticion");
      });
      //this.obtenerTotalPagosTodo();
  }

  public mostrarHistoricos() {
    this.pagoService.getPagos().subscribe(
      result => {
        result.forEach(element => {
          if (element.estado) {
            this.pagos.push(element);
          }
        });
        ///this.pagos = result;
    ///    console.log(this.pagos);
      },
      error => {
        alert("error en la peticion");
      });

      ///this.obtenerTotalPagosTodo();
  }

  public mostrarHistoricosEscribano(escribano:Escribano) {
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = new Array<Pago>();
        result.forEach(element => {
          if (element.escribano.id==escribano.id && element.estado) {
            this.pagos.push(element);
           //// console.log(element);
          }
        });
        //this.pagos = result;
        ///console.log(this.pagos);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerTotalPagosTodo() {
    this.totalPagos = 0;
    this.pagoService.getPagos().subscribe(
      result => {
        ///this.pagos = result;
        ///console.log(result);
        //this.mostrarHistoricos();
        result.forEach(element => {
          //console.log("ele " + element.importe);
          if (element.estado ) {
            this.totalPagos += parseFloat(element.importe);
            console.log("Pago actual: " + this.totalPagos );
          }
          //console.log("total pago despues " + this.totalPagos);
        });

      },
      error => {
        alert("error en la peticion");
      });

  }

  public obtenerTotalPagosEscribano(escribano: Escribano) {
    //escribano.id = 1;
    //console.log(escribano);
    this.totalPagosEscribano = 0;
    this.pagoService.getPagos().subscribe(
      result => {
        result.forEach(element => {
          if (escribano.id == parseInt(element.escribano.id) && element.estado) {
            this.totalPagosEscribano += parseFloat(element.importe);
          }
        });
        ///console.log("total pago Escribano " + this.totalPagosEscribano);
        //this.mostrarHistoricosEscribano(escribano);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerTotalPagosDosFechasDetallado(fechaInicio: Date, fechaFin: Date) {

    fechaInicio = new Date("2019-02-20");
    fechaFin = new Date("2019-11-25");
//    console.log("INICIO - " + fechaFin.toString());
//    console.log("FIN  - " + fechaInicio.toString());

    this.addDays(fechaInicio, 1);
    this.addDays(fechaFin, 1);
    for (let index = fechaInicio; index <= fechaFin; this.addDays(index, 1)) {
//      console.log("INT - " + index.toString());
    }
  }

  public obtenerTotalPagosDosFechas(fechaInicio: Date, fechaFin: Date) {
    //fechaInicio = new Date("2019-03-20");
    //fechaFin = new Date("2019-08-25");
    ////console.log("INICIO - " + fechaInicio.toString());
    //console.log("FIN  - " + fechaFin.toString());
    this.pagoService.getPagos().subscribe(
      result => {
        this.totalPagosDosFechas=0;
        this.pagos = new Array<Pago>();
        //this.pagos = result;
        //console.log(this.pagos);
        result.forEach(element => {
          //console.log(  "--------------------------------");
          ////console.log(new Date(element.fecha.timestamp * 1000 + 86400000).toString());
          //console.log(new Date(element.fecha.timestamp * 1000 ));
          //console.log(new Date(fechaInicio) <= new Date(element.fecha.timestamp * 1000 ) && new Date(fechaFin) >= new Date(element.fecha.timestamp * 1000 ));
          if (new Date(fechaInicio) <= new Date(element.fecha.timestamp * 1000 ) && new Date(fechaFin) >= new Date(element.fecha.timestamp * 1000 )) {
            if (element.estado) {
              this.totalPagosDosFechas+= element.importe - 1 + 1;
            this.pagos.push(element);
            }
            //console.log(element);
          }
        });
       // console.log("Paso Total -------"  +  this.totalPagosDosFechas);
      },
      error => {
        alert("error en la peticion");
      });
  }


  public obtenerTotalPagosDosFechasMasEscribano(fechaInicio: Date, fechaFin: Date, escribano: Escribano) {
    fechaInicio = new Date("2019-03-20");
    fechaFin = new Date("2019-08-25");
   /// console.log("INICIO - " + fechaInicio.toString());
    //console.log("FIN  - " + fechaFin.toString());
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = result;
        //console.log(this.pagos);
        result.forEach(element => {
         /// console.log(  "--------------------------------");
          ////console.log(new Date(element.fecha.timestamp * 1000 + 86400000).toString());
         // console.log(new Date(element.fecha.timestamp * 1000 ).toString());
         // console.log(fechaInicio <= new Date(element.fecha.timestamp * 1000 ) && fechaFin >= new Date(element.fecha.timestamp * 1000 ));
          if (fechaInicio <= new Date(element.fecha.timestamp * 1000 ) && fechaFin >= new Date(element.fecha.timestamp * 1000 )) {
            if (element.escribano.id === escribano.id) {
              if (element.estado) {
              this.totalPagosDosFechas+= element.importe - 1 + 1;
              }
            }
          }
        });
       // console.log("Paso -------"  +  this.totalPagosDosFechas);
      },
      error => {
        alert("error en la peticion");
      });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  removeDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }


  public formarFechaMes(){
   // console.log("0"+(this.mes-1+2));

    this.fechaInicio = new Date(this.anio+"/"+this.mes+"/01");
    this.fechaFin = this.removeDays(new Date(this.anio+"/"+("0"+(this.mes-1+2))+"/01"),1);
    ///this.fechaFin = new Date(anio+"/"+mes+"/01");
    this.obtenerTotalPagosDosFechas(this.fechaInicio,this.fechaFin);
  }


  public formarFechaAnio(){
    this.fechaInicio = new Date(this.anio+"/01/01");
    this.fechaFin = new Date(this.anio+"/12/01");
    ///this.fechaFin = new Date(anio+"/"+mes+"/01");
    this.obtenerTotalPagosDosFechas(this.fechaInicio,this.fechaFin);
  }




}
