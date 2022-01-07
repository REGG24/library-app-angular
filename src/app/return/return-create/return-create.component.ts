import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { ReturnService } from '../return.service';

@Component({
  selector: 'app-return-create',
  templateUrl: './return-create.component.html',
  styleUrls: ['./return-create.component.css']
})
export class ReturnCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private returnService: ReturnService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      id_loan: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    this.activeModal.close(this.myForm.value);
    this.createReturn();
  }

  createReturn(): void {
    const formValue = this.myForm.value;
    this.returnService.create(formValue)
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

  get id_loan() {
    return this.myForm.get('id_loan');
  }

  get date() {
    return this.myForm.get('date');
  }

}
