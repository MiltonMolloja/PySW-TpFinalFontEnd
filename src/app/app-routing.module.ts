import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Agregando componentes
import { HomeComponent } from './components/home/home.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { EscribanoTestComponent } from './components/escribano-test/escribano-test.component';

const routes: Routes =
[
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'escribano', component: EscribanoTestComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
