import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [

   {path:'home',component:HomeComponent},
  {path: 'patient',component:PatientComponent},
  {path: 'patient',children:[
    {path:'',component:PatientComponent}]},
  {path: 'doctor',component:DoctorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
