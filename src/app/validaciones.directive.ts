import { Directive } from '@angular/core' ;
import { AbstractControl, NG_VALIDATORS } from '@angular/forms' ;


//Verifica que un monto no sea cero o negativp
export function verificarMontoValido( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( c.value <= 0  )
    {
        return {negativo: true}
    }
    return null;       
}

@Directive
(
    {
        selector: '[negativo]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: verificarMontoValido }
        ]
    }
)

export class Negativo { }

//Validaciones para que no ingrese espacios en el correo
export function verificarEspacios( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if ( c.value.indexOf(' ') >= 0 )
    {
        return {sinEspacios: true}
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

export class SinEspacios { }

//Validaciones para que no ingrese espacios en el correo
export function verificarCaracterEspecial( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if (  /^[a-zA-Z0-9 ]*$/.test(c.value) == false ) 
    {
        return {sinCaracteres: true}
    }
    return null;       
}

@Directive
(
    {
        selector: '[sin-caracter-especial]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: verificarCaracterEspecial }
        ]
    }
)

export class VerificarCaracteres{ }

//Validaciones para que ingrese solo caracteres validos en el correo
export function verificarEmail( c:AbstractControl )
{
    if ( c.value == null ) return null;
    if (  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(c.value) == false ) 
    {
        return {emailValido: true}
    }
    return null;       
}

@Directive
(
    {
        selector: '[email-valido]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: verificarEmail }
        ]
    }
)

export class EmailValido{ }


//Validaciones para que compare 2 cadenas como en los correos y usuarios
export function comparar( c:AbstractControl, cadena:string )
{
    if ( c.value == null ) return null;
    if ( c.value == cadena ) 
    {
        return {iguales: true}
    }
    return null;       
}

@Directive
(
    {
        selector: '[igualdad]',
        providers:
        [
            { provide:NG_VALIDATORS, multi:true, useValue: comparar }
        ]
    }
)

export class Igualdad{ }


