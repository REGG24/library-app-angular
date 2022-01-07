import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanCreateComponent } from './loan-create/loan-create.component';
import { LoanUpdateComponent } from './loan-update/loan-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoanListComponent,
    LoanCreateComponent,
    LoanUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class LoanModule { }
