import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from './../../models/usuario';
import { Perfil } from './../../models/perfil';
import { Escribano } from './../../models/escribano';
import { Escribania } from './../../models/escribania';

import { PerfilService } from './../../services/perfil.service';
import { EscribanoService } from './../../services/escribano.service';
import { UsuarioService } from './../../services/usuario.service';
//
import { NgForm } from '@angular/forms';

import { PnotifyService } from './../../services/pnotify.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  //Controlar valores repetidos
  matriculaRepetida:boolean = false;
  //Para el filtrado de usuario
  filtroUsuario:string = '';
  //archivo
  imagen_u:any //Se usa any porque es un array con muchos datos y solo interesa la posicion [0].base64
  //
  fechatemp:string;
  comp_password:string;
  comp_email:string;

  //Se necesitan 4 arreglos para recuperar datos
  usuarios:Array<Usuario>;
  escribanias:Array<Escribania>;
  escribanos:Array<Escribano>;
  perfiles:Array<Perfil>;

  //Se usara este arreglos para recuperar los tipos.
  tipos:Array<string> = [ "Socio", "Administrativo", "Administrador", "Gerente" ];

  //
  usuario:Usuario; //Se manejara la creacion de Usuario
  tipoDeDestino:string;
  tipo:string = "";
  //Efectos visuales
  tablaUsuarios:boolean = true; //Se manejan a la vez
  formCreacion:boolean = true; //Se manejan a la vez
  botonesDeModificacion:boolean = false; // Se usa para mostrar los modificar y ocultar los de crear.
  respuesta:string="";

  //Se usa para mostrar Escribano, Perfil y Usuario
  ventana:string = "";

  pnotify = undefined;

  constructor(public loginService: LoginService,  private usuarioService:UsuarioService, private perfilService:PerfilService, private escribanoService:EscribanoService ,pnotifyService: PnotifyService)
  {
    //
    this.inicializarUsuario();
    //
    this.usuarios = new Array<Usuario>() ;
    this.escribanias = new Array<Escribania>() ;
    this.perfiles = new Array<Perfil>() ;

    this.obtenerUsuarios();
    this.obtenerEscribanias();
    this.obtenerPerfiles();
    this.obtenerEscribanos();
    this.pnotify = pnotifyService.getPNotify();
    this.pnotify.defaults.styling = 'bootstrap4';
  }

  ngOnInit() { }

  //////
  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

  //Usado por el input de archivo
  convertirYCargar()
  {
    //Se pasa a la imagen del usuario
    this.usuario.imagen = this.imagen_u[0].base64;
  }

  /****Manejan los efectos visuales e inicializan los objetos****/
  //Inicializa todos los campos objetos de un usuario
  inicializarUsuario()
  {
    this.usuario = new Usuario();
    this.usuario.email = "";
    this.usuario.password = "";
    this.usuario.perfil = new Perfil();//
    this.usuario.perfil.fechaNac = new Date();
    this.usuario.escribano = new Escribano();
    this.usuario.escribano.escribania = new Escribania();
    this.comp_password = "";
    this.comp_email = "" ;
    //this.tipo = "";
    this.fechatemp = "";
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

  /****Obtiene los usuarios, perfiles, escribanias y escribanos de la base de datos****/
  //Los usuarios cargados y validos en la base de datos
  obtenerUsuarios()
  {
    let usuario:Usuario;
    this.usuarioService.getUsuarios().subscribe
    (
      (resultados) =>
      {
        this.usuarios = new Array<Usuario>();
        resultados.forEach
        (
          elemento =>
          {
            usuario = new Usuario();
            Object.assign(usuario, elemento);
            usuario.perfil.fechaNac = new Date( (elemento.perfil.fechaNac.timestamp + 11000 ) * 1000 );
            this.usuarios.push(usuario);
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
    this.perfilService.getPerfiles().subscribe
    (
      (resultados) =>
      {
        this.perfiles = new Array<Perfil>();
        this.perfiles =  resultados;
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
        resultados.forEach
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
        this.escribanos = resultados;
      },
      error =>
      {
        console.log("Error al recuperar escribanos.");
      }
    );
  }///

  /***Metodos usados para la Creacion***/
  //Llama a las ventana de creaccion
  comenzarLaCreacion( form:NgForm )
  {
    if( form.valid == true )
    {
      this.inicializarUsuario();
      this.desactivarBotonesDeModificacion();
      this.ocultarInicio();
      this.usuario.tipo = this.tipo;
      if( this.usuario.tipo == "Socio" )
      {
        this.cambiarVentana("escribano");
      }
      else
      {
        this.usuario.escribano = null;
        this.cambiarVentana("perfil");
      }
    }
  }////

  //Crea un escribano con los datos de usuario
  crearEscribano( form:NgForm )
  {
    //Se pregunta si el formulario es valido
    if( form.valid == true && !this.matriculaRepetida )
    {
      this.usuario.escribano.estado = true;
      this.escribanoService.sendEscribano(this.usuario.escribano).subscribe
      (
        resultado1 =>
        {
          console.log("Escribano enviado.");
          this.pnotify.info({
            text: "Se Guardo escribano Correctamtne",
            type: 'info'
          });
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
        resultados.forEach
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
    if( form.valid == true && !this.controlarDNI()  )
    {
      this.usuario.perfil.estado = true ;
      this.usuario.perfil.fechaNac  = new Date( this.fechatemp );
      this.perfilService.sendPerfil(this.usuario.perfil).subscribe
      (
        resultado2 =>
        {
          console.log("Perfil subido.");
          this.pnotify.info({
            text: "Se Guardo perfil Correctamtne",
            type: 'info'
          });
          this.cargarPerfilesyAsignarAlUsuario();
        },
        error =>
        {
          console.log("Error al enviar perfil.");
        }
      );
    }
    else
    {
      console.log("No se puede crear.");
    }
   }///

   //Pracedimiento que carga los perfiles de la base de datos actuales y asigna el perfil cargado
   cargarPerfilesyAsignarAlUsuario()
   {
    let perfil:Perfil;
    this.perfilService.getPerfiles().subscribe
    (
      (resultados) =>
      {
        this.perfiles = new Array<Perfil>();
        resultados.forEach
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
    if( form.valid == true && this.coincidencia() && !this.controlarUsername()  && !this.controlarEmail() )
    {
      this.usuario.estado = true ;
      this.usuarioService.sendUsuario(this.usuario).subscribe
      (
        resultado3 =>
        {
          console.log("Usuario subido.");
          this.pnotify.info({
            text: "Se Guardo Usuario Correctamtne",
            type: 'info'
          });
          this.obtenerUsuarios();
          //se cambia a la siguiente ventana
          this.cambiarVentana("");
          this.inicializarUsuario();
          this.tipo = "";
          this.mostrarInicio();
        },
        error =>
        { console.log("Error al enviar usuario"); }
      );
    }
   }///

  //Cuando se presiona el boton llama a la ventana modal.
  prepararBorrado(user:Usuario)
  {
    this.usuario = user;//Hace una copia del usuario
  }

  //Si se oprime cancelar o se cierra el modal se descarta la copia
  cancelarborrado()
  {
    this.inicializarUsuario();
  }

  //Realiza el borrado del usuario seleccionado.
  realizarborrado()
  {
    //borra escribano si existe
    if(this.usuario.tipo === "Socio" )
    {
      this.escribanoService.borradoDeEscribano(this.usuario.escribano).subscribe
      (
        resultado => {
          console.log("eliminado correctamente escribano.");
          this.pnotify.error({
            text: "Se Elimino Escribano Correctamente..",
            type: 'danger'
          });
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
    this.perfilService.borradoDePerfil(this.usuario.perfil).subscribe
    (
      resultado => {
        console.log("eliminado correctamente perfil.");
        this.pnotify.error({
          text: "Se Elimino Perfil Correctamente..",
          type: 'danger'
        });
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
    this.usuarioService.borradoDeUsuario(this.usuario).subscribe
    (
      resultado => {
        console.log("eliminado correctamente Usuario.");
        this.pnotify.error({
          text: "Se Elimino Usuario Correctamente..",
          type: 'danger'
        });
        this.obtenerUsuarios();
        this.inicializarUsuario();
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
    this.fechatemp = this.usuario.perfil.fechaNac.toISOString().substring(0, 10);
    this.comp_password = this.usuario.password;
    this.comp_email = this.usuario.email ;
    this.tipoDeDestino = this.usuario.tipo;
  }///

  //Cancela la modificacion
  cancelarModificado()
  {
    this.inicializarUsuario();
  }///

  //ComenzarModificacion
  comenzarModifiacion( form:NgForm )
  {
    //Se pregunta si es valido
    if(form.valid)
    {
      //Se pregunta si el origen es de tipo socio
      if( this.usuario.tipo == "Socio" )
      {
        this.usuario.tipo == this.tipoDeDestino;
        //Se pregunta si el destino sigue siendo socio o no
        if( this.tipoDeDestino == "Socio" )
        {
          this.usuario.escribano.escribania = this.escribanias.find( escribania => escribania.id === this.usuario.escribano.escribania.id  );
          this.ocultarInicio();
          this.activarBotonesDeModificacion();
          this.cambiarVentana("escribano");
        }
        else
        {
          //Si el socio cambia se debe eliminar el escribano asignado, asignar null al escribano de usuario y
          //pasar al perfil directamente
          this.escribanoService.borradoDeEscribano(this.usuario.escribano).subscribe
          (
            resultado => {
              console.log("eliminado correctamente escribano.");
              this.pnotify.error({
                text: "Se Elimino Escribano Correctamente..",
                type: 'danger'
              });
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
        //Se pregunta sigue siendo distinto de socio
        if( this.tipoDeDestino != "Socio" )
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
    }
    else
    {
      this.inicializarUsuario(); //Si no selecciona un usuario se descartara la copia
    }
  }///

  //Modifica el escribano
  modificarEscribano( form:NgForm )
  {
    //Se pregunta si el formulario es valido
    if( form.valid == true && !this.matriculaRepetida )
    {
      this.escribanoService.modificarEscribano(this.usuario.escribano).subscribe
      (
        resultados => {
          console.log("modificado correctamente escribano.")
          this.pnotify.success({
            text: "Se Modificado Escribano Correctamente..",
            type: 'success'
          });
          this.cambiarVentana("perfil");
          return true;
          },
          error => {
          console.error("error al modificar escribano.");
          console.log(error);
          return false;
          }
      );
    }
  }///

  //Modifica el perfil
  modificarPerfil( form:NgForm )
  {
    //Se pregunta si el formulario es valido
    if( form.valid == true && !this.controlarDNI() )
    {
      this.usuario.perfil.fechaNac = new Date( this.fechatemp );
      this.perfilService.modificarPerfil(this.usuario.perfil).subscribe
      (
        resultados => {
          console.log("modificado correctamente perfil.")
          this.pnotify.success({
            text: "Se Modificado Perfil Correctamente..",
            type: 'success'
          });
          this.cambiarVentana("usuario");
          this.usuario.tipo = this.tipoDeDestino; //Asigna el tipo de usuario nuevo
          this.imagen_u = this.usuario.imagen;
          return true;
          },
          error => {
          console.error("error al modificar perfil.");
          console.log(error);
          return false;
          }
      );
    }
  }///

  //Modificar el usuario
  modificarUsuario( form:NgForm )
  {
    //Se pregunta si el formulario es valido
    if( form.valid == true && this.coincidencia() && !this.controlarUsername()  && !this.controlarEmail() )
    {
      this.usuarioService.modificarUsuario(this.usuario).subscribe
      (
        resultados => {
          console.log("modificado correctamente usuario.")
          this.pnotify.success({
            text: "Se Modificado Usuario Correctamente..",
            type: 'success'
          });
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
    }
  }///

  //Cuando no se cambia los datos de usuario existente
  noCambiarUsuario()
  {
    this.cambiarVentana("");
    this.inicializarUsuario();
    this.mostrarInicio();
    this.tipo = "";
    this.desactivarBotonesDeModificacion();
    this.respuesta="";
  }

  //Controla que el nombre de usuario no se repita
  controlarUsername():boolean
  {
    let encontrado:boolean = false;
      //Aqui preguntamos si el usuario tiene un id indefinido. Es un nuevo usuario
      if( this.usuario.id == undefined )
      {
        for( let usuario of this.usuarios )
        {
          if(this.usuario.username == usuario.username)
          {
            encontrado = true ;
            break; //Si lo encuentra deja de
          }
        }
      }
      else
      {
        //Quiere decir que tiene un id
        for( let usuario of this.usuarios )
        {
          if(this.usuario.username == usuario.username && this.usuario.id != usuario.id  )
          {
            encontrado = true ;
            break; //Si lo encuentra deja de
          }
        }
      }
    return encontrado;
  }//

  //Controlar
  controlarEmail():boolean
  {
    let encontrado:boolean = false;
    if( this.usuario.id == undefined )
    {
      for( let usuario of this.usuarios )
      {
        if(this.usuario.email == usuario.email)
        {
          encontrado = true ;
          break; //Si lo encuentra deja de
        }
      }
    }
    else
    {
      //Quiere decir que tiene un id
      for( let usuario of this.usuarios )
      {
        if(this.usuario.email == usuario.email && this.usuario.id != usuario.id  )
        {
          encontrado = true ;
          break; //Si lo encuentra deja de
        }
      }
    }
    return encontrado;
  }///

  //Controlar Matricula
  controlarMatricula()
  {
    /*
    let encontrado:boolean = false;
    if( this.usuario.escribano.matricula == undefined )
    {
      for( let escribano of this.escribanos )
      {
        if(this.usuario.escribano.matricula == escribano.matricula  )
        {
          encontrado = true;
          break; //Si lo encuentra deja de
        }
      }
    }
    else
    {
      for( let escribano of this.escribanos )
      {
        if( this.usuario.escribano.matricula == escribano.matricula && this.usuario.escribano.id !=  escribano.id )
        {
          encontrado = true;
          break;
        }
      }
    }
    return encontrado;
    */
   if( this.usuario.escribano.matricula > 0 )
   {
    
     //Cuando esta creando
      if( this.usuario.escribano.id == undefined )
      {
        this.escribanoService.validarMatricula(this.usuario.escribano.matricula, -1 ).subscribe
        (
          resultado =>
          {
              if( resultado == true )
              {
                this.matriculaRepetida = true;
              }
              else
              {
                this.matriculaRepetida = false;
              }
          },
          error =>
          {
            console.log("Error al consultar matricula...");
            this.matriculaRepetida = true;
          }  
        );
      }
      else
      {
        this.escribanoService.validarMatricula(this.usuario.escribano.matricula, this.usuario.escribano.id ).subscribe
        (
          resultado =>
          {
            if( resultado == true )
            {
              this.matriculaRepetida = true;
            }
            else
            {
              this.matriculaRepetida = false;
            }
          },
          error =>
          {
            console.log("Error al consultar matricula...");
            this.matriculaRepetida = true;
          }
        );
      } 
    }
    else
    {
      //Si no se ingreso nada debe mantenerse en falso.
      this.matriculaRepetida = false;
    }
    
  }///

  //Controla que el dni no se repita
 controlarDNI():boolean
  {
    let encontrado:boolean = false;
    if( this.usuario.perfil.id == undefined )
    {
      for( let perfil of this.perfiles )
      {
        if(this.usuario.perfil.dni == perfil.dni  )
        {
          encontrado = true ;
          break; //Si lo encuentra deja de
        }
      }
    }
    else
    {
      for( let perfil of this.perfiles )
      {
        if( this.usuario.perfil.dni == perfil.dni && this.usuario.perfil.id !=  perfil.id )
        {
          encontrado = true;
          break;
        }
      }
    }
    return encontrado;
  }///

  //Revisa que concidan los emails y contraseña de control
  coincidencia():boolean
  {
    return this.usuario.email == this.comp_email && this.usuario.password == this.comp_password;
  }

  //Consultar matricula
  matricularepetida()
  {
    //Si si el escribano tiene matricula null quiere decir que lo esta creando
    if(this.usuario.escribano.id == null )
    {
      //Entonces se manda -1 como id
      this.escribanoService.validarMatricula(this.usuario.escribano.matricula,-1).subscribe
      (
        resultados =>
        {
          console.log(resultados);
        },
        error =>
        {
          console.log("Error.........");
        }
      );   
    }
    else
    {
      //Si tiene id quiere decir que ya tiene una matricula cargada y la manda
      this.escribanoService.validarMatricula(this.usuario.escribano.matricula,this.usuario.escribano.id).subscribe
      (
        resultados =>
        {
          console.log(resultados);
        },
        error =>
        {
          console.log("Error.........");
        }
      );   
    }

  }////

}
