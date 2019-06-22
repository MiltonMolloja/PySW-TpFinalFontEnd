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
  //Se necesitan 4 arreglos para recuperar datos
  usuarios:Array<Usuario>;
  escribanias:Array<Escribania>;
  escribanos:Array<Escribano>;
  perfiles:Array<Perfil>;

  //Se usara este arreglos para recuperar los tipos.
  tipos:Array<string> = [ "socio", "administrativo", "administrador", "gerente" ];

  //
  usuario:Usuario; //Se manejara la creacion de Usuario
  perfil:Perfil; //Se manejara la creacion de perfil
  escribano:Escribano; //Se manejara la cracion de escribano/socio 
  
  //Efectos visuales
  tablaUsuarios:boolean = true; //Se manejan a la vez
  formCreacion:boolean = true; //Se manejan a la vez

  //Son los formularios
  formCreacionEscribano:boolean = false;
  formCreacionPerfil:boolean = false;
  formCreacionUsuario:boolean = false;

  btnCopiar=false;
  constructor( private usuarioService:ServUsuarioService, private perfilService:ServPerfilService, private escribanoService:ServEscribanoService  ) 
  {
    //
    this.inicializarUsuario();
    this.inicializarPerfil();
    this.inicializarEscribano();
    //
    this.usuarios = new Array<Usuario>() ;
    this.escribanias = new Array<Escribania>() ;
    this.perfiles = new Array<Perfil>() ;

    this.obtenerUsuarios();
    this.obtenerEscribanias();
    this.obtenerPerfiles();
    this.obtenerEscribanos();
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

  //Inicializa el perfil
  inicializarPerfil()
  {
    this.perfil = new Perfil();
  }

  //Inicializa el escribano
  inicializarEscribano()
  {
    this.escribano = new Escribano();
    this.escribano.escribania = new Escribania();
  }

  //Ocultar ventanas de inicio
  ocultarInicio()
  {
    this.tablaUsuarios = true;
    this.formCreacion = true;
  }

  //Restaura las ventanas de inicio
  mostrarInicio()
  {
    this.tablaUsuarios = false;
    this.formCreacion = false;
  }


  //Los usuarios cargados y validos en la base de datos
  obtenerUsuarios()
  {
    let usuario:Usuario;
    this.usuarioService.obtenerUsuarios().subscribe
    (
      (resultados) => 
      {
        this.usuarios = new Array<Usuario>();
        resultados['usuarios'].forEach
        (
          elemento => 
          {
            usuario = new Usuario();
            Object.assign(usuario, elemento);
            //Solo se cargaran los que tengan estado valido.
            if(usuario.estado == true )
            {
              this.usuarios.push(usuario);
            }
          }
        );
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
    let perfil:Perfil;
    this.perfilService.obtenerPerfiles().subscribe
    (
      (resultados) =>
      {
        this.perfiles = new Array<Perfil>();
        resultados['perfiles'].forEach
        (
          elemento =>
          {
            perfil = new Perfil();
            Object.assign(perfil, elemento);
            //Solo se cargaran los que tengan estado valido.
            if( perfil.estado == true  )
            {
              this.perfiles.push(perfil);
            }
          }
        );
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
    let escribania:Escribania;
    this.escribanoService.getEscribanias().subscribe
    (
      (resultados) =>
      {
        this.escribanias = new Array<Escribania>();
        resultados['escribanias'].forEach
        (
          elemento =>
          {
            escribania = new Escribania();
            Object.assign(escribania, elemento);
            if(escribania.estado == true)
            {
              this.escribanias.push(escribania);  
            }
          }
        );
        console.log( this.escribanias );
      },
      error =>
      {
        console.log("Error al recuperar escribanias");
      }
    );
  }///

  //Recupera los escribanos de la base de datos
  obtenerEscribanos()
  {
    let escribano:Escribano;
    this.escribanoService.getEscribanos().subscribe
    (
      (resultados) =>
      {
        this.escribanos = new Array<Escribano>();
        resultados['escribanos'].forEach
        (
          elemento =>
          {
            escribano = new Escribano();
            Object.assign(escribano, elemento);
            if(escribano.estado == true )
            {
              this.escribanos.push(escribano);
            }
          }
        ); 
      },
      error =>
      {
        console.log("Error al recuperar escribanos.");
      }
    );
  }

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
