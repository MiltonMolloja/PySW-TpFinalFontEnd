import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Agregando componentes
import { HomeComponent } from './components/home/home.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { EscribanoTestComponent } from './components/escribano-test/escribano-test.component';
import { PerfilTestComponent } from './components/perfil-test/perfil-test.component';
import { GestionNovedadComponent } from './components/gestion-novedad/gestion-novedad.component';
import { GestionEscribaniasComponent } from './components/gestion-escribania/gestion-escribania.component';

const routes: Routes =
[
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'escribano', component: EscribanoTestComponent},
  { path: 'perfil', component: PerfilTestComponent},
  { path: 'novedad', component: GestionNovedadComponent},
  { path: 'escribanias', component: GestionEscribaniasComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
