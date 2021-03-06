import { Pipe, PipeTransform } from '@angular/core';
import { Escribania } from './../models/escribania';

@Pipe({
  name: 'filterEscribania'
})
export class FilterEscribaniaPipe implements PipeTransform {

  transform(value: Array<Escribania>, arg: any): Array<Escribania> 
  {
    let escribanias:Array<Escribania> = new Array<Escribania>();
    if( arg == '' || arg.length < 3 )
    {
      return value;
    }
    else
    {
      for(let escribania of value)
      {
        if( escribania.nombre.toLowerCase().indexOf( arg.toLowerCase() ) > -1 || escribania.direccion.toLowerCase().indexOf( arg.toLowerCase() )  > -1 )
        {
          escribanias.push(escribania);
        }
      }
      return escribanias;
    }    
    //return null
  }

}
