import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from 'src/app/author/author.service';
import { BookService } from 'src/app/book/book.service';
import { ClientService } from 'src/app/client/client.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';
import { LoanService } from 'src/app/loan/loan.service';
import { ReturnService } from 'src/app/return/return.service';
import { SaleService } from 'src/app/sale/sale.service';
import { ErrorComponent } from '../error/error.component';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.css']
})
export class DeleteWarningComponent implements OnInit {
  @Input() id: number;
  @Input() type: string;

  constructor(
    public activeModal: NgbActiveModal, 
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private clientService: ClientService,
    private authorService: AuthorService,
    private bookService: BookService,
    private saleService: SaleService,
    private loanService: LoanService,
    private returnService: ReturnService
  ) { }

  ngOnInit(): void {

  }

  onDelete(): void {
    let service: any;
    switch (this.type){
      case "employee":
        service = this.employeeService;
        break;
      case "client":
        service = this.clientService;
        break;
      case "author":
        service = this.authorService;
        break;
      case "book":
        service = this.bookService;
        break;
      case "sale":
        service = this.saleService;
        break;
      case "loan":
        service = this.loanService;
        break;
      case "return":
        service = this.returnService;
        break;
    }
    service.delete(this.id)
      .subscribe(
        response => {
          if(response.status === 'OK'){
            this.openSuccessModal(response);
          }else{
            this.openErrorModal(response);
          }     
        },
        error => {
          this.openErrorModal(error);
        }
      ).add(()=>{
        this.onClose();
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

  onClose(): void{
    this.activeModal.close('Delete modal closed!');
  } 

}
