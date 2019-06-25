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
import { EscribanoTestComponent } from './components/escribano-test/escribano-test.component';
import { PerfilTestComponent } from './components/perfil-test/perfil-test.component';
import { GestionEscribaniasComponent } from './components/gestion-escribania/gestion-escribania.component';
import { GestionNovedadComponent } from './components/gestion-novedad/gestion-novedad.component';
import { NavbarTipoTestComponent } from './components/navbar-tipo-test/navbar-tipo-test.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EscribanoComponent } from './components/escribano/escribano.component';
import { EscribaniaComponent } from './components/escribania/escribania.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { GerenteComponent } from './components/gerente/gerente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdministradorComponent,
    EscribanoTestComponent,
    PerfilTestComponent,
    NavbarTipoTestComponent,
    GerenteComponent,
    NovedadComponent,
    EscribaniaComponent,
    EscribanoComponent,
    UsuarioComponent,
    PerfilComponent,
    GestionNovedadComponent,
    GestionEscribaniasComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,
    AlifeFileToBase64Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbPusYwryniehTI37uSODwdKteRvcI0Qc'
    })
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
