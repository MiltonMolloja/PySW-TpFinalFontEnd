import { Component, OnInit } from '@angular/core';
import { EscribaniaService } from '../../services/escribania.service';
import { Escribania } from 'src/app/models/escribania';

@Component({
  selector: 'app-escribanias-publica',
  templateUrl: './escribanias-publica.component.html',
  styleUrls: ['./escribanias-publica.component.css']
})
export class EscribaniasPublicaComponent implements OnInit {
  escribania:Escribania;
  escribanias:Array<Escribania>;

  constructor(private escribaniaService:EscribaniaService) {
    this.escribania=new Escribania();
    this.escribanias=new Array<Escribania>();
    this.getEscribanias();

   }

   public getEscribanias(){
     this.escribaniaService.getEscribanias().subscribe(
      result => {
      this.escribanias = result;
      console.log(this.escribanias);
    },
    error => {
      alert("error en la peticion");
    });
  }

  ngOnInit() {
  }

}
