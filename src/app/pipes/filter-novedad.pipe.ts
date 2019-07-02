import { Pipe, PipeTransform } from '@angular/core';
import { Novedad } from './../models/novedad' ;

@Pipe({
  name: 'filterNovedad'
})
export class FilterNovedadPipe implements PipeTransform {

  transform(value: Array<Novedad>, arg: any): Array<Novedad> 
  {
    let novedades:Array<Novedad> = new Array<Novedad>();
    if( arg == '' || arg.lenght < 3  )
    {
      return value ;
    }
    else
    {
      for(let novedad of value)
      {
        if( novedad.asunto.toLowerCase().indexOf( arg.toLowerCase() )  > -1 || novedad.escribano.matricula.toString().indexOf( arg ) > -1 || novedad.mensaje.toLowerCase().indexOf( arg.toLowerCase() ) > -1 )
        {
          novedades.push(novedad);
        }
      }
      return novedades;
    }
    //return null;
  }

}
