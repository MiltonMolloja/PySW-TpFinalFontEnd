import { Directive } from '@angular/core' ;
import { AbstractControl, NG_VALIDATORS } from '@angular/forms' ;

//Verifica que no tenga caracteres especiales
export function verificarCaracterEspecial(c:AbstractControl){
    // si el control no ha sido usado retorno null
    if (c.value == null) return null;
    // si se ha ingresado un caracter especial en el nombre
    // la funcion test retornara true
    if(/^[a-zA-Z0-9-\s\_]*$/.test(c.value) == false){
    // retorno un error mediante un objeto con un atributo booleado,
    // este atributo será parte del array de errors asociado al control.
    return {sinCaracterEspecial: true};
    }
    // en cualquier otro caso retorno null (sin error)
    return null;
   } 

@Directive({
 selector: '[sin-caracter-especial]',
 providers:[
 {provide: NG_VALIDATORS, multi: true, useValue:verificarCaracterEspecial}
 ]
})

export class SinCaracterEspecial{}
   
//Controla que no se ingrese un negativo o cero
export function verificarNumero( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( c.value <= 0  )
    {
        return {negativo: true};
    }
    return null;       
}

@Directive
(
    {
        selector: '[negativo]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: verificarNumero }
        ]
    }
)

export class Negativo { }

//Verifica que una cadena no tenga espacio
export function verificarEspacios( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( c.value.indexOf(' ') >= 0 )
    {
        return {sinEspacios: true};
    }
    return null;       
}

@Directive
(
    {
        selector: '[sin-espacios]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: verificarEspacios }
        ]
    }
)

export class SinEspacios {}

export function controlarRangoDNI( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( c.value < 10000000 || c.value > 100000000  )
    {
        return {dniValido: true};
    }
    return null;       
}    

@Directive
(
    {
        selector: '[dni-valido]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: controlarRangoDNI }
        ]
    }
)

export class ControlarRangoDNI {}

export function soloLetras( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( /^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(c.value) == false  )
    {
        return { palabras: true};
    }
    return null;       
}    

@Directive
(
    {
        selector: '[solo-letras]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: soloLetras }
        ]
    }
)

export class SoloLetrasYEspacios {}

export function validarFecha( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( new Date(c.value) > new Date() )
    {
        return { fechaValida: true};
    }
    return null; 
}

@Directive
(
    {
        selector: '[fecha-valida]',
        providers:
        [
            { provide: NG_VALIDATORS, multi:true, useValue: validarFecha }
        ]
    }
)

export class FechaValida {}

export function vaidarImagen( c:AbstractControl )
{
    console.log("La imagen contiene: " + c.value );
    if ( c.value == null ) return null;
    if ( c.value == " " )
    {
        return { imagenValida: true};
    }
    return null;  
}

@Directive
(
    {
        selector: '[imagen-valida]',
        providers:
        [
            { provide: NG_VALIDATORS, multi:true, useValue: vaidarImagen }
        ]
    }
)

export class ImagenValida {}