import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario';
import { Perfil } from './../../models/perfil';
import { Escribano } from './../../models/escribano';
import { Escribania } from './../../models/escribania' ;
import { ServUsuarioService } from './../../services/serv-usuario.service';
import { ServPerfilService } from './../../services/serv-perfil.service';
import { ServEscribanoService  } from './../../services/serv-escribano.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  usuario:Usuario;
  usuarios:Array<Usuario>;
  escribanias:Array<Escribania>;

  tipos:Array<string> = [ "socio", "administrativo", "administrador", "gerente" ];

  constructor( private usuarioService:ServUsuarioService, private perfilService:ServPerfilService, private escribano:ServEscribanoService  ) 
  {
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>() ;
    this.escribanias = new Array<Escribania>() ;

    this.obtenerUsuarios();
  }

  ngOnInit() {
  }

  obtenerUsuarios()
  {
    this.usuarioService.obtenerUsuarios().subscribe
    {
      resultados => 
      {
        this.usuarios = resultados['usuarios'];
        console.log(this.usuarios);
      }
    }
  }///


}
