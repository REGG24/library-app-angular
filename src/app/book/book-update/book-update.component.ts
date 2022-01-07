import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/interfaces/book';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SuccessComponent } from 'src/app/shared/modals/success/success.component';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  @Input() book: Book;
  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(5)]],
      description: ['',[Validators.required, Validators.minLength(15), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(50), Validators.max(1000)]],
      stock: ['',[Validators.required, Validators.min(1), Validators.max(200)]],
      id_author: ['', Validators.required]
    });
  }

  onSubmitForm(): void {
    this.activeModal.close(this.myForm.value);
    this.updateBook();
  }

  updateBook(): void {
    const formValue = this.myForm.value;
    this.bookService.update(this.book.id_book,formValue)
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

  get name(): AbstractControl {
    return this.myForm.get('name');
  }

  get description(): AbstractControl {
    return this.myForm.get('description');
  }

  get price(): AbstractControl {
    return this.myForm.get('price');
  }

  get stock(): AbstractControl {
    return this.myForm.get('stock');
  }

  get id_author(): AbstractControl {
    return this.myForm.get('id_author');
  }

}
