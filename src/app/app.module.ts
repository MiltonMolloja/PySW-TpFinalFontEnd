import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//
import {HttpClientModule} from '@angular/common/http';
import {DataTableModule} from "angular-6-datatable";
//
import { LoginService } from './services/login.service';
//Cuando se quiere trabajar con ngModel
import { FormsModule } from '@angular/forms';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EscribanoComponent } from './components/escribano/escribano.component';
import { EscribaniaComponent } from './components/escribania/escribania.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { GerenteComponent } from './components/gerente/gerente.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PagoComponent } from './components/pago/pago.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EscribaniasPublicaComponent } from './components/escribanias-publica/escribanias-publica.component';
import { SocioComponent } from './components/socio/socio.component';
//Para los filtros
import { FilterUsuarioPipe } from './pipes/filter-usuario.pipe';
//Para las validaciones
import { SinCaracterEspecial, Negativo, SinEspacios, ControlarRangoDNI, SoloLetrasYEspacios, FechaValida, ImagenValida } from './validaciones.directive';
import { FilterEscribaniaPipe } from './pipes/filter-escribania.pipe';
import { FilterNovedadPipe } from './pipes/filter-novedad.pipe' ;

import { PnotifyService } from './services/pnotify.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdministradorComponent,
    GerenteComponent,
    NovedadComponent,
    EscribaniaComponent,
    EscribanoComponent,
    UsuarioComponent,
    PerfilComponent,
    NavigationBarComponent,
    PagoComponent,
    AboutComponent,
    ContactComponent,
    EscribaniasPublicaComponent,
    SocioComponent,
    FilterUsuarioPipe,
    //Usados para validar
    SinCaracterEspecial,
    Negativo,
    SinEspacios,
    ControlarRangoDNI,
    SoloLetrasYEspacios,
    FechaValida,
    ImagenValida,
    FilterEscribaniaPipe,
    FilterNovedadPipe
    //

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    AlifeFileToBase64Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7p6OTrBNHwGzD85w3MilKfbKd3TBTK0k'
    })
  ],
  providers: [ LoginService, PnotifyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
