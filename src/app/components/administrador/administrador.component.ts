import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario';
import { Perfil } from './../../models/perfil';
import { Escribano } from './../../models/escribano';
import { Escribania } from './../../models/escribania' ;
import { ServUsuarioService } from './../../services/serv-usuario.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {


  constructor( private usuarioService:ServUsuarioService ) 
  {

  }

  ngOnInit() {
  }

}
