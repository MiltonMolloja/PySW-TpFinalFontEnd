import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//
import {HttpClientModule} from '@angular/common/http';
//
import { LoginService } from './services/login.service';
//Cuando se quiere trabajar con ngModel
import { FormsModule } from '@angular/forms';
import { AdministradorComponent } from './components/administrador/administrador.component';
import {DataTableModule} from "angular-6-datatable";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ListadoComponent } from './components/listado/listado.component';

//
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdministradorComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlifeFileToBase64Module,
    DataTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB2o_oaQi1qZaS7JHNN6HqKVqTLYVBPNWs'
    })   

  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
