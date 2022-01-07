import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/interfaces/employee';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EmployeeUdateComponent } from '../employee-udate/employee-udate.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  employees: Employee[] = [];
  employeesAUX: Employee[] = [];
  reverse: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.employeeService.employeesChanged$
    .subscribe(()=>{
      this.readEmployees();
    });
    this.readEmployees();
  }

  readEmployees(): void {
    this.employeeService.readAll()
    .subscribe(
     response => {
        this.employees = response.data.employees;
        this.employeesAUX = [...this.employees];       
      },
      error => {
        console.log(error);
        this.openErrorModal(error);
      }
    ); 
  }

  searchByName(event: Event){
    const inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue != ""){
      this.employees = this.employeesAUX.filter(employees => {
        return employees.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else{
      this.employees = this.employeesAUX;
    }
  }

  onOpenNewEmployeeModal(): void {
    const modalRef = this.modalService.open(EmployeeCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idEmployee: number): void {
    this.employeeService.read(idEmployee)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(EmployeeUdateComponent);
        modalRef.componentInstance.employee = response.data.employee;
        modalRef.result.then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
      },
      error => {
        console.log( error.message);
      }
    );    
  }

  onDelete(idEmployee: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idEmployee;
    modalRef.componentInstance.type="employee";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.employees.sort((a: Employee,b: Employee)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.employees.sort((a: Employee,b: Employee)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.employees.sort(function (a, b){
      if(a[property] < b[property]){
        return -1 * direction;
      }
      else if(a[property] > b[property]){
        return 1 * direction;
      }else{
        return 0;
      }
    })
  }

  openErrorModal(error: Error): void {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.error = error;
    modalRef.result.then((result) => {
      console.log("modal",result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
