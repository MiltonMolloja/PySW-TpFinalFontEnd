import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EscribanoTestComponent } from './components/escribano-test/escribano-test.component';

import {DataTableModule} from "angular-6-datatable";
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    EscribanoTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
