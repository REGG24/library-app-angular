import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleCreateComponent } from './sale-create/sale-create.component';
import { SaleUpdateComponent } from './sale-update/sale-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    SaleListComponent,
    SaleCreateComponent,
    SaleUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SaleModule { }
