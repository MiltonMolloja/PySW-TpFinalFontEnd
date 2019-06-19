import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscribanoTestComponent } from './components/escribano-test/escribano-test.component';

const routes: Routes = [
  {path: 'escribano', component: EscribanoTestComponent},
  {path: '**', component: EscribanoTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
