import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from '../employee-details.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;


  constructor(private loginEmp: EmployeeDetailsService ,private router:Router) { }

  ngOnInit(): void {
  }

  modelLogin = {
    empNO: "",
    password: ""

  }
    submit() {
    console.log('Login call.....');
    var payload = {
      empNo:"",
      password:" "
    };
   
    if (payload.empNo != null && payload.password != null) {
      payload.empNo = this.modelLogin.empNO;
      payload.password = this.modelLogin.password;
      
      console.log("EMP NO::",payload.empNo);
      console.log("Password:::",payload.password);

      this.loginEmp.accesstoken(payload).subscribe((res) => {

        console.log("Login==>",res);

        this.result = this.result.status;
        console.log("Login Status Checking::::",this.result);

        if(this.result == "1"){
          console.log("Login Sucess:");
          this.router.navigate(['Listing']);
        }else{
          console.log("Invalid UserName and Password:::");
          // this.router.navigate(['Login']);  
          window.location.reload();
        }   
      })
      
    }


  }
  }



