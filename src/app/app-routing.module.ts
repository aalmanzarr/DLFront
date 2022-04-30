import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NumberComponent } from './number/number.component';


const routes: Routes = [
  {path:'number',component:NumberComponent},
  {path:'**',component:NumberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
