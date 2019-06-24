import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { Pago } from 'src/app/models/pago';
import { Escribano } from 'src/app/models/escribano';

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
  totalPagos: number;
  totalPagosEscribano: number;
  totalPagosDosFechas: number;

  fechaInicio: Date;
  fechaFin: Date;

  constructor(public loginService: LoginService, private pagoService: PagoService) {
    this.pago = new Pago();
    this.escribano = new Escribano();
    this.pagos = new Array<Pago>();
    this.escribanos = new Array<Escribano>();
    this.totalPagos = 0;
    this.totalPagosEscribano = 0;
    this.totalPagosDosFechas = 0;
    this.fechaInicio = new Date;
    this.fechaFin = new Date;
    this.mostrarHistoricos();
    this.obtenerEscribanos();
    this.obtenerTotalPagosTodo();
    this.obtenerTotalPagosEscribano(this.escribano);
    this.obtenerTotalPagosDosFechas(this.fechaInicio, this.fechaFin);
  }

  ngOnInit() {
  }

  logout() {
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

  public obtenerEscribanos() {
    this.pagoService.getEscribanos().subscribe(
      results => {
        //console.log(this.escribanos);
        this.escribanos = results;
        //console.log(this.escribanos);
        //this.escribanias = JSON.parse(results['escribanias']);
        //console.log(this.escribanias);
      }
    );
  }

  public mostrarHistoricos() {
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = result;
    ///    console.log(this.pagos);
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerTotalPagosTodo() {
    this.pagoService.getPagos().subscribe(
      result => {
        //this.pagos = result;
    ///    console.log(result);
        result.forEach(element => {
          //console.log("ele " + element.importe);
          this.totalPagos += parseFloat(element.importe);
    //      console.log("total pago despues " + this.totalPagos);
        });
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerTotalPagosEscribano(escribano: Escribano) {
    //escribano.id = 3;
    this.pagoService.getPagos().subscribe(
      result => {
        result.forEach(element => {
          if (escribano.id == parseInt(element.escribano.id)) {
            this.totalPagosEscribano += parseFloat(element.importe);
          }
        });
        console.log("total pago Escribano " + this.totalPagosEscribano);
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

  public obtenerTotalPagosDosFechas2(fechaInicio: Date, fechaFin: Date) {
    fechaInicio = new Date("2019-03-20");
    fechaFin = new Date("2019-08-25");
    ///console.log("INICIO - " + fechaFin.toString());
    //console.log("FIN  - " + fechaInicio.toString());
    //console.log(fechaInicio <= new Date("2019-06-25") && fechaFin <=new Date("2019-06-25"));
    //if (fechaInicio <= new Date("2019-05-25") && fechaFin >=new Date("2019-05-25")) {
    //  console.log("Paso  - -------"  );
    //}

    this.pagoService.getPagos().subscribe(
      result => {
        console.log("fecha -------"  +  result);
        this.pagos = result;
        //result.forEach(element => {
          this.pagos.forEach(element => {
          console.log("fecha -------"  +  element.fecha.toString());
          if (fechaInicio <= element.fecha && fechaFin >= element.fecha) {
          this.totalPagosDosFechas+= element.importe - 1 + 1;
          console.log("Paso -------"  +  element.importe);
          }
        });
        console.log("total Dos Fechas " + this.totalPagosDosFechas );
      },
      error => {
        alert("error en la peticion");
      });
  }

  public obtenerTotalPagosDosFechas(fechaInicio: Date, fechaFin: Date) {
    fechaInicio = new Date("2019-03-20");
    fechaFin = new Date("2019-08-25");
    console.log("INICIO - " + fechaFin.toString());
    console.log("FIN  - " + fechaInicio.toString());
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = result;
        console.log(this.pagos);
        result.forEach(element => {
        ///this.pagos.forEach(element => {
          console.log(  "--------------------------------");
          console.log( element.fecha.timestamp * 1000 );
          //console.log(JSON.stringify(element.fecha.timestamp * 1000));

          console.log(new Date(element.fecha.timestamp * 1000 + 86400000).toString());
          console.log(element.fecha.timestamp * 1000 + 50000000);


          //console.log(JSON.parse(JSON.stringify(new Date().setTime(1561248000).toString())));
          //console.log(JSON.stringify(element.fecha));
          //console.log(JSON.parse(JSON.stringify(element.fecha)));
          console.log(fechaInicio <= element.fecha && fechaFin >= element.fecha);
          if (fechaInicio <= element.fecha && fechaFin >= element.fecha) {
          this.totalPagosDosFechas+= element.importe - 1 + 1;
          console.log("Paso -------"  +  element.importe);
          }
        });
      },
      error => {
        alert("error en la peticion");
      });
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }




}
