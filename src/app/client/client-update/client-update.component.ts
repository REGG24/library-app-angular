import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {
  @Input() client;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      phone: ['', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      address: ['', [Validators.required,Validators.minLength(5)]] 
    });
  }

  onSubmitForm(): void {
    const formValue = this.myForm.value;
    this.clientService.update(this.client.id_client,formValue)
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

  get name(): AbstractControl {
    return this.myForm.get('name');
  }

  get phone(): AbstractControl {
    return this.myForm.get('phone');
  }

  get address(): AbstractControl {
    return this.myForm.get('address');
  }

}
