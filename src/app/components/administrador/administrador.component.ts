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

  escribano:Escribano;

  tipos:Array<string> = [ "socio", "administrativo", "administrador", "gerente" ];

  constructor( private usuarioService:ServUsuarioService, private perfilService:ServPerfilService, private escribanoService:ServEscribanoService  ) 
  {
    this.usuario = new Usuario();
    this.usuarios = new Array<Usuario>() ;
    this.escribanias = new Array<Escribania>() ;

    this.obtenerUsuarios();
    this.obtenerEscribanias();

    this.escribano = new Escribano(30, this.escribanias[1],2300,"UBA",true );
    console.log(this.escribano);
  }

  ngOnInit() {
  }

  //Los usuarios cargados en la base de datos
  obtenerUsuarios()
  {
    this.usuarioService.obtenerUsuarios().subscribe
    (
      (resultados:any) => 
      {
        this.usuarios = resultados['usuarios'];
      },
      error =>
      {
        console.log("Error al recuperar usuarios.");
      }
    );
  }///

  //Obtiene las escribanias registradas
  obtenerEscribanias()
  {
    this.escribanoService.getEscribanias().subscribe
    (
      (resultados:any) =>
      {
        
        this.escribanias = resultados ;
        console.log( this.escribanias );
      },
      error =>
      {
        console.log("Error al recuperar escribanias");
      }
    );
  }///

}
