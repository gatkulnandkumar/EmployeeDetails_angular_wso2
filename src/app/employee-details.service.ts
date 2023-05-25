import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  updateListing(empId: number): any {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient) {  }

  urlAdd="https://192.168.11.48:8244/employeeService/1.0.0/insertEmployeeDetails"
 
  insertEmployee(data:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
    headers = headers.append('Content-Type','application/json');
    return this.http.post(this.urlAdd,data, {headers});
  }

  urlSelect="https://192.168.11.48:8244/employeeService/1.0.0/selectAllEmpDetails";
 

  getEmployee(data:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
    headers = headers.append('Content-Type','application/json');
    return this.http.post(this.urlSelect,data,{headers});
  } 


  
  urlDelete="https://192.168.11.48:8244/employeeService/1.0.0/deleteEmployeeWithEID";
 

  deleteEmployee(data:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
    headers = headers.append('Content-Type','application/json');
    return this.http.post(this.urlDelete,data,{headers});
  }

 urlUpdate="https://192.168.11.48:8244/employeeService/1.0.0/UpdateEmployeeDetails";

  UpdateEmployee(data:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
    headers = headers.append('Content-Type','application/json');
    return this.http.post(this.urlUpdate,data,{headers});
  }



  urlSelectWithID="https://192.168.11.48:8244/employeeService/1.0.0/getEmployeeWithEID"

  selectWithID(data:any){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
    headers = headers.append('Content-Type','application/json');
    return this.http.post(this.urlSelectWithID,data,{headers});

  }
 
  urlLogin="https://192.168.11.48:8244/employee_service_User/1.0.0/getUserWithUserName"

      accesstoken(data:any){
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        // headers = headers.append('Authorization', 'Bearer cc5c09fe-3b07-3401-932c-7b64a229ed9f');
        headers = headers.append('Content-Type','application/json');
        return this.http.post(this.urlLogin,data,{headers});
      }

}
