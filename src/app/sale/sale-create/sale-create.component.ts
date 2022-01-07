import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      id_book: ['', Validators.required],
      id_employee : ['', Validators.required],
      id_client: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    this.activeModal.close(this.myForm.value);
    this.createSale();
  }

  createSale(): void {
    const formValue = this.myForm.value;
    this.saleService.create(formValue)
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

  get id_book(): AbstractControl {
    return this.myForm.get('id_book');
  }

  get id_employee(): AbstractControl {
    return this.myForm.get('id_employee');
  }

  get id_client(): AbstractControl {
    return this.myForm.get('id_client');
  }

  get date(): AbstractControl {
    return this.myForm.get('date');
  }

}
