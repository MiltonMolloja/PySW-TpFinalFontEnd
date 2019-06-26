import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Agregando componentes
import { HomeComponent } from './components/home/home.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { EscribaniaComponent } from './components/escribania/escribania.component';
import { EscribanoComponent } from './components/escribano/escribano.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { GerenteComponent } from './components/gerente/gerente.component';

const routes: Routes =
[
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'escribania', component: EscribaniaComponent},
  { path: 'escribano', component: EscribanoComponent},
  { path: 'novedad', component: NovedadComponent},
  { path: 'gerente', component: GerenteComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
