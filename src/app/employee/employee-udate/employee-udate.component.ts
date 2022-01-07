import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { Employee } from 'src/app/interfaces/employee';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-udate',
  templateUrl: './employee-udate.component.html',
  styleUrls: ['./employee-udate.component.css']
})
export class EmployeeUdateComponent implements OnInit {

  @Input() employee: Employee;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.employee);
  }

  private createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      phone: ['', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      address: ['', [Validators.required,Validators.minLength(5)]],
      salary: ['', [Validators.required,Validators.min(5000),Validators.max(100000)]]
    });
  }

  submitForm(): void {
    const formValue = this.myForm.value;
    this.employeeService.update(this.employee.id_employee,formValue)
    .subscribe(
      response => {
        this.openSuccessModal(response);
      },
      error => {
        this.openErrorModal(error);
      }
    ).add(()=>{
      this.activeModal.close(this.myForm.value);
    });
  }

  openSuccessModal(response: CustomResponse): void {
    const modalRef = this.modalService.open(SuccessComponent);
    modalRef.componentInstance.response = response
    modalRef.result.then((result) => {
      console.log("modal",result);
    }).catch((error) => {
      console.log(error);
    });
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

  closeModal(): void {
    this.activeModal.close('Modal Closed');
  }

  get name(): AbstractControl {
    return this.myForm.get('name');
  }

  get phone(): AbstractControl {
    return this.myForm.get('phone');
  }

  get address(): AbstractControl {
    return this.myForm.get('address');
  }
  
  get salary(): AbstractControl {
    return this.myForm.get('salary');
  }

}
