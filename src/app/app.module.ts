import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsService } from './employee-details.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListingComponent,
    AddEmployeeComponent,
    UpdateComponent,  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [EmployeeDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
