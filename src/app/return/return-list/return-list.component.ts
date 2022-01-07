import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Return } from 'src/app/interfaces/return';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { ReturnCreateComponent } from '../return-create/return-create.component';
import { ReturnUpdateComponent } from '../return-update/return-update.component';
import { ReturnService } from '../return.service';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.css']
})
export class ReturnListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  returns: Return[] = [];
  returnsAUX: Return[] = [];
  reverse: boolean = false;

  constructor(
    private returnService: ReturnService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.returnService.returnsChanged$
    .subscribe(()=>{
      this.readReturns();
    });
    this.readReturns();
  }

  readReturns(): void {
    this.returnService.readAll()
    .subscribe(
     response => {
        this.returns = response.data.returns;
        this.returnsAUX = [...this.returns];       
      },
      error => {
        console.log(error);
        this.openErrorModal(error);
      }
    ); 
  }

  searchByName(event: Event){
    /*const inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue != ""){
      this.returns = this.returnsAUX.filter(returns => {
        return returns.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else{
      this.returns = this.returnsAUX;
    }*/
  }

  onOpenNewReturnModal(): void {
    const modalRef = this.modalService.open(ReturnCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idReturn: number): void {
    this.returnService.read(idReturn)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(ReturnUpdateComponent);
        modalRef.componentInstance.return = response.data.return;
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

  onDelete(idReturn: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idReturn;
    modalRef.componentInstance.type="return";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.returns.sort((a: Return,b: Return)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.returns.sort((a: Return,b: Return)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.returns.sort(function (a, b){
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
