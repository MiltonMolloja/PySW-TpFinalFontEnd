import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Agregando componentes
import { HomeComponent } from './components/home/home.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = 
[
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent  },
  { path: 'listado-escribanias', component: ListadoComponent  }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
