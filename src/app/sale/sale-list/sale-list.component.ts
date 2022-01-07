import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sale } from 'src/app/interfaces/sale';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { SaleCreateComponent } from '../sale-create/sale-create.component';
import { SaleUpdateComponent } from '../sale-update/sale-update.component';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  sales: Sale[] = [];
  salesAUX: Sale[] = [];
  reverse: boolean = false;

  constructor(
    private saleService: SaleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.saleService.saleChanged$
    .subscribe(()=>{
      this.getSales();
    });
    this.getSales();
  }

  getSales(): void {
    this.saleService.getAll()
    .subscribe(
      response => {
        this.sales = response.data.sales;
        this.salesAUX = [...this.sales];
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
      this.sales = this.salesAUX.filter(sales => {
        return sales.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else if(inputValue == ""){
      this.sales = this.salesAUX;
    } */
  }

  onOpenNewSaleModal(): void {
    const modalRef = this.modalService.open(SaleCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idSale: number): void {
    this.saleService.read(idSale)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(SaleUpdateComponent);
        modalRef.componentInstance.sale = response.data.sale;
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

  onDelete(idSale: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idSale;
    modalRef.componentInstance.type="sale";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.sales.sort((a: Sale, b: Sale)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.sales.sort((a: Sale, b: Sale)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.sales.sort(function (a, b){
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
