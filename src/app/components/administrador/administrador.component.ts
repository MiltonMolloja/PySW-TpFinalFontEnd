import { Component, OnInit } from '@angular/core';
import { Perfil } from './../../models/perfil';
import { Escribano } from './../../models/escribano';
import { Escribania } from './../../models/escribania' ;
import { Usuario } from './../../models/usuario';
import { ServUsuarioService } from './../../services/serv-usuario.service';
import { ServPerfilService } from './../../services/serv-perfil.service';
import { ServEscribanoService  } from './../../services/serv-escribano.service';
//
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  //Necesarias para recuperar datos
  usuarios:Array<Usuario>;
  escribania:Escribania;
  escribanias:Array<Escribania>;
  perfiles:Array<Perfil>;
  //
  tipos:Array<string> = [ "socio", "administrativo", "administrador", "gerente" ];

  //
  usuario:Usuario;
  //
  btnCopiar=false;
  constructor( private usuarioService:ServUsuarioService, private perfilService:ServPerfilService, private escribanoService:ServEscribanoService  ) 
  {
    //
    this.inicializarUsuario();
    //
    this.escribania = new Escribania();
    this.usuarios = new Array<Usuario>() ;
    this.escribanias = new Array<Escribania>() ;
    this.perfiles = new Array<Perfil>() ;

    this.obtenerUsuarios();
    this.obtenerEscribanias();
    this.obtenerPerfiles();
  }

  ngOnInit() {
  }

  //Inicializa todos los campos objetos de un usuario
  inicializarUsuario()
  {
    this.usuario = new Usuario();
    this.usuario.perfil = new Perfil();//
    this.usuario.escribano = new Escribano();
    this.usuario.escribano.escribania = new Escribania();
  }///

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

  //Obtiene los perfiles de la base de datos
  obtenerPerfiles()
  {
    this.perfilService.obtenerPerfiles().subscribe
    (
      (resultados:any) =>
      {
        this.perfiles = resultados['perfiles'];
      },
      error =>
      {
        console.log("Error al recuperar perfiles.");
      }     
    );
  }

  //Obtiene las escribanias registradas
  obtenerEscribanias()
  {
    this.escribanoService.getEscribanias().subscribe
    (
      (resultados) =>
      {
        this.escribanias = new Array<Escribania>();
        resultados.forEach
        (
          elemento =>
          {
            this.escribania = new Escribania();
            Object.assign(this.escribania, elemento)
            this.escribanias.push(this.escribania);
          }
        );
        //this.escribanias = resultados ;
        console.log( this.escribanias );
      },
      error =>
      {
        console.log("Error al recuperar escribanias");
      }
    );
  }///

  //Prueba de muestra los campos
  prueba( form: NgForm )
  {
    if( form.valid == true )
    {
      console.log("Nombre de Usuario:" + this.usuario.username );
      console.log("Password: " + this.usuario.password  );
      console.log("Nombres:" + this.usuario.perfil.nombres );
      console.log("Apellidos" + this.usuario.perfil.apellidos );
      console.log("Matricula: " + this.usuario.escribano.matricula );
      console.log("Universidad: " +  this.usuario.escribano.universidad );
      console.log("Nombre de escribania" + this.usuario.escribano.escribania.nombre );
    }
  }///

  //Envia un usuario a la base de datos
  //Primero se cargara el escribano, luego el perfil y por ultimo el usuario
  enviarUsuario( form: NgForm )
  {
    if( form.valid == true )
    {
      this.usuario.estado=true;
      this.usuario.perfil.estado=true;
      if(this.usuario.tipo == "socio" )
      {
        this.usuario.escribano.estado = true;
        this.escribanoService.enviarEscribano(this.usuario.escribano).subscribe
        (
          resultado1 =>
          {
            console.log("Escribano enviado.");
          },
          error=>
          { console.log("Error al enviar escribano"); } 
        );
      }
      else
      {
        this.usuario.escribano = null ;
      }

      this.perfilService.enviarPerfil(this.usuario.perfil).subscribe
      (
        resultado2 => 
        {
          console.log("Perfil subido.");
          this.llamarCrearUsuario();
        },
        error => 
        { console.log("Error al enviar perfil.") }
      );

      /*
      console.log("Username: " + this.usuario.username);
      this.usuarioService.enviarUsuario(this.usuario).subscribe
      (
        resultado3 =>
        {
          console.log("Usuario subido.");
        },
        error =>
        { console.log("Error al enviar usuario"); }
      );
      */
    }
  }//

  //Copia el usuario seleccionado a los campos
  copiarUser( usuario:Usuario )
  {
    this.btnCopiar = true;
    this.inicializarUsuario();
    this.usuario = Object.assign(this.usuario, usuario); 
  }

  //Aplica los cambios sobre el usuario
  realizarCambios( form:NgForm)
  {
    if( form.valid == true )
    {
      if(this.usuario.tipo == "socio" )
      {
        this.escribanoService.modificarEscribano(this.usuario.escribano).subscribe
        (
          data1 => {
            console.log("modificado correctamente escribano.")
            return true;
        },
        error => 
        {
          console.error("Error al modificar escribano.");
          console.log(error);
          return false;
        }
        );
      }

      this.perfilService.modificarPerfil(this.usuario.perfil).subscribe
      (
        data2 => {
          console.log("modificado correctamente perfil.")
          return true;
      },
      error => 
      {
        console.error("Error al modificar perfil.");
        console.log(error);
        return false;
      }
      );

      this.usuarioService.modificarUsuario(this.usuario).subscribe
      (
        data3 => {
          console.log("modificado correctamente usuario.")
          
          this.obtenerUsuarios();
          this.btnCopiar = false ;
          this.inicializarUsuario();
          return true;
      },
      error => 
      {
        console.error("Error al modificar usuario.");
        console.log(error);
        return false;
      }
      );
    }
  }//

  //
  probarEnviodeUsuario()
  { let perfil1 = new Perfil();
    let usuario1 = new Usuario(20,"antonio","antonio","antoni@gmail.com","administrador","pendiente",true,null);
    this.usuarioService.enviarUsuario(usuario1).subscribe
    (
      resultado3 =>
      {
        console.log("Usuario subido.");
      },
      error =>
      { console.log("Error al enviar usuario"); }
    );
  }

  //Crear Usuario
  llamarCrearUsuario()
  {
    console.log("Username: " + this.usuario.username);
    this.usuarioService.enviarUsuario(this.usuario).subscribe
    (
      resultado3 =>
      {
        console.log("Usuario subido.");
      },
      error =>
      { console.log("Error al enviar usuario"); }
    );
  }///

}
