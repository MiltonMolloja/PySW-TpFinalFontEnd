import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from './../models/usuario';
@Pipe({
  name: 'filterUsuario'
})
export class FilterUsuarioPipe implements PipeTransform {

  //Recibe el arreglo de usuario y un parametro para filtrar
  transform(value: Array<Usuario>, arg:string): Array<Usuario> 
  {
    let usuarios:Array<Usuario> = new Array<Usuario>();
    if( arg == '' )
    {
      for(let usuario of value)
      {
        if(usuario.estado == true )
        {
          usuarios.push(usuario); //Si su estado es verdadero lo agrega
        }
      }
      return usuarios ;
    } 
  return null;
  }

}