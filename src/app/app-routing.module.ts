import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },

  { path: 'Login', component: LoginComponent},
  { path: 'Listing', component: ListingComponent},
  { path: 'AddEmployee', component: AddEmployeeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
