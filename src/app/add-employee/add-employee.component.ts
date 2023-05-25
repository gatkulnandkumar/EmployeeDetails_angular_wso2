import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { EmployeeDetailsService } from '../employee-details.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
/* import { DatePipe } from '@angular/common'; */

import * as moment from 'moment';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  empId: any;
  selectwithId: any;
  dob: any;
  updateFlag: boolean = false;
  name = "nandkumar";

  constructor(private route: ActivatedRoute, private router: Router,
    private insertEmp: EmployeeDetailsService, private updateEmp: EmployeeDetailsService,
    private updateEmployee: EmployeeDetailsService) {

  }

  ngOnInit(): void {
    this.getEmployeeData();

  }



  model = {
    EID: " ",
    eName: "",
    salary: "",
    address: "",
    email: "",
    phone: "",
    dob: " "
  }



  addEmployee() {
    console.log('called');
    var payload = {
      EID: "",
      ENAME: "",
      EMAIL: "",
      ADDRESS: "",
      SALARY: "",
      PHONE: "",
      DOB: " "

    };
    console.log(this.model);
    if (this.model.EID != null) {
      payload.EID = this.model.EID;
      payload.ENAME = this.model.eName;
      payload.SALARY = this.model.salary;
      payload.ADDRESS = this.model.address;
      payload.EMAIL = this.model.email;
      payload.PHONE = this.model.phone;
      /*  payload.DOB = this.model.dob; */
      payload.DOB = moment(this.model.dob).format('DD-MMM-YYYY');
      /* '01-Feb-1980';  */
      this.insertEmp.insertEmployee(payload).subscribe((res) => {
        console.log("res=====>", res)
        this.router.navigate(['Listing']);


      })
    }
  }

  update() {

    {
      var payload = {
        EID: "",
        ENAME: "",
        EMAIL: "",
        ADDRESS: "",
        SALARY: "",
        PHONE: "",
        DOB: " "
      };
      console.log("update fn called", this.model);

      if (this.model.EID != null) {
        console.log(payload.EID);
        payload.EID = this.model.EID;
        payload.ENAME = this.model.eName;
        payload.SALARY = this.model.salary;
        payload.ADDRESS = this.model.address;
        payload.EMAIL = this.model.email;
        payload.PHONE = this.model.phone;
        /* payload.DOB =  '01-Feb-1980';   */
        // this.model.dob=moment(this.selectwithId.DOB).format('YYYY-MM-DD');
        payload.DOB = moment(this.model.dob).format('DD-MMM-YYYY');


        this.updateEmployee.UpdateEmployee(payload).subscribe((res) => {
          console.log("UPDATED Successfully", res)


        })

      }


    }

  }


  getData() {

    this.model = {
      EID: "",
      eName: "Nandkumar",
      address: "fdsfdsfsdfas",
      email: "nand@sakec.in",
      phone: "8596741236",
      salary: "145263",
      dob: "2021-01-27"
    }

  }


  getEmployeeData() {

    this.route.queryParams.subscribe(params => {
      this.model.EID = params['empid'];

      if (params['empid'] != null) {
        this.updateFlag = true;
      }
      console.log('update called');
      console.log("EID", this.model.EID);
      var payload = {
        EID: this.model.EID
      };

      if (payload.EID != null) {
        console.log(payload.EID);
        this.updateEmp.selectWithID(payload).subscribe((res: any) => {
          console.log("select Successfully", res);

          this.selectwithId = res?.EMPLOYEEDEATAILSCollection?.EMPLOYEEDEATAILS;
          console.log("selectwithId====>", this.selectwithId);

          if (this.model.EID != null) {

            this.model.EID = this.selectwithId.EID;
            this.model.eName = this.selectwithId.ENAME;
            this.model.email = this.selectwithId.EMAIL;
            this.model.address = this.selectwithId.ADDRESS;
            this.model.salary = this.selectwithId.SALARY;
            this.model.phone = this.selectwithId.PHONE;
            /*  this.model.dob=this.selectwithId.DOB; */
            // this.model.dob=moment(this.selectwithId.DOB).format('DD-MMM-YYYY');
            this.model.dob = moment(this.selectwithId.DOB).format('YYYY-MM-DD');

          }
          console.log("this.model after assigning update value to model", this.model);

        })


      }

    });

  }


  listing() {

    this.router.navigate(['Listing'])

  }
}
