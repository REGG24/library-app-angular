import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Loan } from 'src/app/interfaces/loan';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { LoanCreateComponent } from '../loan-create/loan-create.component';
import { LoanUpdateComponent } from '../loan-update/loan-update.component';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  loans: Loan[] = [];
  loansAUX: Loan[] = [];
  reverse: boolean = false;

  constructor(
    private loanService: LoanService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loanService.loanChanged$
    .subscribe(()=>{
      this.getLoans();
    });
    this.getLoans();
  }

  getLoans(): void {
    this.loanService.getAll()
    .subscribe(
      response => {
        this.loans = response.data.loans;
        this.loansAUX = [...this.loans];
      },
      error => {
        console.log(error);
        this.openErrorModal(error);
      }
    )
  }

  searchByName(event: Event){ 
    /*const inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue != ""){
      this.loans = this.loansAUX.filter(loans => {
        return loans.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else if(inputValue == ""){
      this.loans = this.loansAUX;
    } */
  }

  onOpenNewLoanModal(): void {
    const modalRef = this.modalService.open(LoanCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idLoan: number): void {
    this.loanService.read(idLoan)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(LoanUpdateComponent);
        modalRef.componentInstance.loan = response.data.loan;
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

  onDelete(idLoan: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idLoan;
    modalRef.componentInstance.type="loan";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.loans.sort((a: Loan, b: Loan)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.loans.sort((a: Loan, b: Loan)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.loans.sort(function (a, b){
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
