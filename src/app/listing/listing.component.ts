import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { EmployeeDetailsService } from '../employee-details.service';

import { map, filter } from "rxjs/operators";
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'ts-xlsx';

import { CSVRecord } from '../CSVRecord';  



// import { map } from 'rxjs/operators';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})


export class ListingComponent implements OnDestroy, OnInit {


  
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  
  fileContent: string = "";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  allEmpDetails: any;
  dtElement!: DataTableDirective;

  isDtInitialized: boolean = false

  empId: any;
  eid: any;
 

  constructor(private http:HttpClient,private selectAllEmp: EmployeeDetailsService, private deleteEmp: EmployeeDetailsService, private router: Router) { }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };

    this.selectAllEmpDetails();
  }


  Deletemodel = {
    EID: ""
  }


  delete(eid: any) {


    console.log('Delete called');
    console.log("EID", eid);
    var payload = {
      EID: eid

    };

    if (payload.EID != null) {
      console.log(payload.EID);
      this.deleteEmp.deleteEmployee(payload).subscribe((res) => {
      
        console.log("Deleted Successfully", res)

        if (res != null ) {
          this.selectAllEmpDetails();
          window.location.reload();
        }
      })

    }


  }

  selectAllEmpDetails() {
    console.log("getEmployee API call==>");
    var payload = {};
    this.selectAllEmp.getEmployee(payload).subscribe((res: any) => {
      console.log("getEmployee::::", res);

      if (res != null && res.EMPLOYEEDEATAILSCollection != null) {

        if ((res.EMPLOYEEDEATAILSCollection.EMPLOYEEDEATAILS) instanceof Array) {
          this.allEmpDetails =  res.EMPLOYEEDEATAILSCollection.EMPLOYEEDEATAILS;
          console.log("this.allEmpDetails===>", this.allEmpDetails);
        }
        else {
          this.allEmpDetails = [res.EMPLOYEEDEATAILSCollection.EMPLOYEEDEATAILS];
          console.log("this.allEmpDetails===>", this.allEmpDetails);
          // this.dtTrigger.next();
        }

        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      }
      else{
        this.allEmpDetails = [];
        console.log(' ===final else=======',this.allEmpDetails);
        
      }
    })
  }


  updateListing(empId: any) {
    console.log("EID :: ", empId);
    this.router.navigate(['/AddEmployee'], { queryParams: { empid: empId } });

  }


  goUsers() {
    this.router.navigate(['/AddEmployee'], { queryParamsHandling: 'preserve' });
  }


 /*  readFile() {
    this.http.get('assets/hello.txt', {responseType: 'text'})
          .subscribe(data => console.log(data));
      } */


    /*   public onChange(fileList: FileList): void {
        let file = fileList[0];
        let fileReader: FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function(x) {
           let fileContent = fileReader.result;
          let csvRecordsArray = (<string>fileContent).split(/\r\n|\n/);  
          let headersRow = this.getHeaderArray(csvRecordsArray); 
          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
          console.log(this.fileContent);
          var str = [this.fileContent];
          console.log(str);
        };
        fileReader.readAsText(file);
       
      } */

      uploadListener($event: any): void {  
  
        let text = [];  
        let files = $event.srcElement.files;  
      
        if (this.isValidCSVFile(files[0])) {  
      
          let input = $event.target;  
          let reader = new FileReader();  
          reader.readAsText(input.files[0]);  
      
          reader.onload = () => {  
            let csvData = reader.result;  
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
      
            let headersRow = this.getHeaderArray(csvRecordsArray);  
      
            this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
          };  
      
          reader.onerror = function () {  
            console.log('error is occured while reading file!');  
          };  
      
        } else {  
          alert("Please import valid .csv file.");  
          this.fileReset();  
        }  
      }  
      getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
        let csvArr = [];  
      
        for (let i = 1; i < csvRecordsArray.length; i++) {  
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
          if (curruntRecord.length == headerLength) {  
            let csvRecord: CSVRecord = new CSVRecord();  
            csvRecord.id = curruntRecord[0].trim();  
            csvRecord.firstName = curruntRecord[1].trim();  
            csvRecord.lastName = curruntRecord[2].trim();  
            csvRecord.age = curruntRecord[3].trim();  
            csvRecord.position = curruntRecord[4].trim();  
            csvRecord.mobile = curruntRecord[5].trim();  
            csvArr.push(csvRecord);  
          }  
        }  
        return csvArr;  
      }  
      
      isValidCSVFile(file: any) {  
        return file.name.endsWith(".csv");  
      }  
      
      getHeaderArray(csvRecordsArr: any) {  
        let headers = (<string>csvRecordsArr[0]).split(',');  
        let headerArray = [];  
        for (let j = 0; j < headers.length; j++) {  
          headerArray.push(headers[j]);  
        }  
        return headerArray;  
      }  
      
      fileReset() {  
        this.csvReader.nativeElement.value = "";  
        this.records = [];  
      }  
    }       




