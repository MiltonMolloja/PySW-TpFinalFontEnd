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
  copiaUsuario:Usuario;
  tipoDeDestino:string;

  //Efectos visuales
  tablaUsuarios:boolean = true; //Se manejan a la vez
  formCreacion:boolean = true; //Se manejan a la vez
  botonesDeModificacion:boolean = false; // Se usa para mostrar los modificar y ocultar los de crear.
  respuesta:string="";

  //Se usa para mostrar Escribano, Perfil y Usuario
  ventana:string = "";

  constructor( private usuarioService:ServUsuarioService, private perfilService:ServPerfilService, private escribanoService:ServEscribanoService  ) 
  {
    //
    this.inicializarUsuario();
    this.inicializarCopia();
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

  /*Manejan los efectos visuales e inicializan los objetos */

  //Inicializa todos los campos objetos de un usuario
  inicializarUsuario()
  {
    this.usuario = new Usuario();
    this.usuario.perfil = new Perfil();//
    this.usuario.escribano = new Escribano();
    this.usuario.escribano.escribania = new Escribania();
  }/////

  //Ocultar ventanas de inicio
  ocultarInicio()
  {
    this.tablaUsuarios = false;
    this.formCreacion = false;
  }////

  //Restaura las ventanas de inicio
  mostrarInicio()
  {
    this.tablaUsuarios = true;
    this.formCreacion = true;
  }////

  //Cambiar la ventana a mostrar para escribano, perfil y usuario
  cambiarVentana( nombreVentana:string )
  {
    this.ventana = nombreVentana;
  }////


  /*Obtiene los usuarios, perfiles, escribanias y escribanos de la base de datos*/

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
  }///

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
  }///

  /*Metodos usados para la Creacion */

  //Llama a las ventana de creaccion
  comenzarLaCreacion()
  {
    this.ocultarInicio();
    if( this.usuario.tipo == "socio" )
    {
      this.cambiarVentana("escribano");
    }
    else
    {
      this.usuario.escribano = null;
      this.cambiarVentana("perfil");
    }
  }////

  //Crea un escribano con los datos de usuario 
  crearEscribano( form:NgForm )
  { 
    //Se pregunta si el formulario es valido
    if( form.valid == true )
    {
      this.usuario.escribano.estado = true;
      this.escribanoService.enviarEscribano(this.usuario.escribano).subscribe
      (
        resultado1 =>
        {
          console.log("Escribano enviado.");
          this.cargarEscribanosyAsignarAlUsuario();
        },
        error=>
        { 
          console.log("Error al enviar escribano");
        } 
      );
    }
   }///

   //Cargas los escribanos y busca el creado para asignarlo al usuario
   cargarEscribanosyAsignarAlUsuario()
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
              if( escribano.matricula === this.usuario.escribano.matricula && escribano.universidad === this.usuario.escribano.universidad )
              {
                this.usuario.escribano = escribano ;
              }
            }
          }
        );
        this.cambiarVentana("perfil"); 
      },
      error =>
      {
        console.log("Error al recuperar escribanos.");
      }
    );     
   }///

   //Crea un perfil
   crearPerfil( form:NgForm )
   {
    //Se pregunta si el formulario es valido
    if( form.valid == true )
    {
      this.usuario.perfil.estado = true ;
      this.perfilService.enviarPerfil(this.usuario.perfil).subscribe
      (
        resultado2 => 
        { 
          console.log("Perfil subido.");
          this.cargarPerfilesyAsignarAlUsuario();
        },
        error => 
        { 
          console.log("Error al enviar perfil."); 
        }
      );  
    }     
   }///

   //Pracedimiento que carga los perfiles de la base de datos actuales y asigna el perfil cargado
   cargarPerfilesyAsignarAlUsuario()
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
              if( perfil.dni === this.usuario.perfil.dni && perfil.apellidos === this.usuario.perfil.apellidos && perfil.nombres === this.usuario.perfil.nombres )
              {
                this.usuario.perfil = perfil;
              }
            }
          }
        );
        this.cambiarVentana("usuario");
      },
      error =>
      {
        console.log("Error al recuperar perfiles.");
      }    
    );
  }///

   ///Finalmente crea el usuario
   crearUsuario( form:NgForm )
   {
    //Se pregunta si el formulario es valido
    if( form.valid == true )
    {
      this.usuario.estado = true ;
      this.usuarioService.enviarUsuario(this.usuario).subscribe
      (
        resultado3 =>
        {
          console.log("Usuario subido.");
          this.obtenerUsuarios();
          //se cambia a la siguiente ventana
          this.cambiarVentana("");
          this.inicializarUsuario();
          this.mostrarInicio();
        },
        error =>
        { console.log("Error al enviar usuario"); }
      );
    }               
   }///

   //simula borrar un perfil
   simulacionBorradoPerfil()
   {
      let perfil:Perfil = new Perfil() ;
      perfil = this.perfiles.find( per => per.id === 52 );
      console.log(perfil);
      this.perfilService.borrarPerfil(perfil).subscribe
      (
        resultado => {
          console.log("eliminado correctamente perfil.")
          return true;
      },
      error => 
      {
        console.error("eliminado al modificar perfil.");
        console.log(error);
        return false;
      }
      );
   }

   //Inicializa la copia de usuario
   inicializarCopia()
   {
     this.copiaUsuario = new Usuario();
     this.copiaUsuario.perfil = new Perfil();
     this.copiaUsuario.perfil.fecha_nac = new Date();
     this.copiaUsuario.escribano = new Escribano();
     this.copiaUsuario.escribano.escribania = new Escribania();
   }

  //Cuando se presiona el boton llama a la ventana modal. 
  prepararBorrado(user:Usuario)
  {
    this.inicializarCopia();//inicializa la copia usuario
    this.usuario = user;
  }

  //Si se oprime cancelar o se cierra el modal se descarta la copia
  cancelarborrado()
  {
    this.inicializarCopia();
  }

  //Realiza el borrado del usuario seleccionado.
  realizarborrado()
  {
    //borra escribano si existe
    if(this.usuario.tipo == "socio" )
    {
      this.escribanoService.borrarEscribano(this.usuario.escribano).subscribe
      (
        resultado => {
          console.log("eliminado correctamente escribano.");
          return true;
      },
      error => 
      {
        console.error("error al borrar escribano.");
        console.log(error);
        return false;
      }
      );
    }
    //borra perfil
    this.perfilService.borrarPerfil(this.usuario.perfil).subscribe
    (
      resultado => {
        console.log("eliminado correctamente perfil.");
        return true;
      },
      error => 
      {
      console.error("error al borrar perfil.");
      console.log(error);
      return false;
     }
    );
    //borra el usuario
    this.usuarioService.borrarUsuario(this.usuario).subscribe
    (
      resultado => {
        console.log("eliminado correctamente Usuario.");
        this.obtenerUsuarios();
        //this.inicializarCopia();
        return true;
      },
      error => 
      {
      console.error("error al borrar Usuario.");
      console.log(error);
      return false;
      }
    );

  }///

  //Activa los botones de modificar
  activarBotonesDeModificacion()
  {
    this.botonesDeModificacion = true;
  }

  //Desactiva los botones de modificacion
  desactivarBotonesDeModificacion()
  {
    this.botonesDeModificacion = false;
  }

  //Prepara el modificado de usuario
  prepararModificado( usuario:Usuario )
  {
    this.inicializarUsuario();
    this.usuario = Object.assign(this.usuario, usuario);
    this.tipoDeDestino = this.usuario.tipo;
  }///

  //Cancela la modificacion
  cancelarModificado()
  {
    this.inicializarUsuario();
  }///

  //ComenzarModificacion
  comenzarModifiacion()
  {
    //Se pregunta si el origen es de tipo socio
    if( this.usuario.tipo == "socio" )
    {
      this.usuario.tipo == this.tipoDeDestino;
      //Se pregunta si el destino sigue siendo socio o no
      if( this.tipoDeDestino == "socio" )
      {
        this.ocultarInicio();
        this.activarBotonesDeModificacion();
        this.cambiarVentana("escribano");
      }
      else
      {
        //Si el socio cambia se debe eliminar el escribano asignado, asignar null al escribano de usuario y
        //pasar al perfil directamente
        this.escribanoService.borrarEscribano(this.usuario.escribano).subscribe
        (
          resultado => {
            console.log("eliminado correctamente escribano.");
            this.ocultarInicio();
            this.activarBotonesDeModificacion();
            this.usuario.escribano = null;
            this.cambiarVentana("perfil");
            return true;
          },
          error => 
          {
            console.error("error al borrar escribano.");
            console.log(error);
            return false;
          }
        ); 
      }
    }
    //Si tipo de origen no era socio se entra aqui
    else
    {
      this.usuario.tipo == this.tipoDeDestino;
      //Se pregunta sigue siendo distinto de socio
      if( this.tipoDeDestino != "socio" )
      {
        this.ocultarInicio();
        this.activarBotonesDeModificacion();
        this.cambiarVentana("perfil");
      }
      else
      {
        //Si cambia a socio se necesitara que se cree un escribano
        this.usuario.escribano = new Escribano();
        this.usuario.escribano.escribania = new Escribania();
        this.activarBotonesDeModificacion();
        this.ocultarInicio();
        this.respuesta="si";
        this.cambiarVentana("escribano");
      }
    }
  }///

  //Modifica el escribano
  modificarEscribano()
  {
    this.escribanoService.modificarEscribano(this.usuario.escribano).subscribe
    (
      resultados => {
        console.log("modificado correctamente escribano.")
        this.cambiarVentana("perfil");
        return true;
        },
        error => {
        console.error("error al modificar escribano.");
        console.log(error);
        return false;
        }
    );
  }///

  //Modifica el perfil
  modificarPerfil()
  {
    this.perfilService.modificarPerfil(this.usuario.perfil).subscribe
    (
      resultados => {
        console.log("modificado correctamente perfil.")
        this.cambiarVentana("usuario");
        return true;
        },
        error => {
        console.error("error al modificar perfil.");
        console.log(error);
        return false;
        }      
    );
  }///

  //Modificar el usuario
  modificarUsuario()
  {
    this.usuarioService.modificarUsuario(this.usuario).subscribe
    (
      resultados => {
        console.log("modificado correctamente usuario.")
        this.desactivarBotonesDeModificacion();
        this.respuesta="";
        this.cambiarVentana("");
        this.inicializarUsuario();
        this.mostrarInicio();
        this.obtenerUsuarios();
        return true;
        },
        error => {
        console.error("error al modificar usuario.");
        console.log(error);
        return false;
        }
    );
  }///

}