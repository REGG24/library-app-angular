import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @Input() id: number;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      phone: ['', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      address: ['', [Validators.required,Validators.minLength(5)]],
      salary: ['', [Validators.required,Validators.min(5000),Validators.max(100000)]]
    });
  }

  onSubmitForm(): void {
    this.activeModal.close(this.myForm.value);
    this.createEmployee();
  }

  createEmployee(): void {
    const formValue = this.myForm.value;
    this.employeeService.create(formValue)
    .subscribe(
      response => {
        this.openSuccessModal(response);
      },
      error => {
        this.openErrorModal(error);
      }
    );
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

  get name() {
    return this.myForm.get('name');
  }

  get phone() {
    return this.myForm.get('phone');
  }

  get address() {
    return this.myForm.get('address');
  }
  
  get salary() {
    return this.myForm.get('salary');
  }

}
