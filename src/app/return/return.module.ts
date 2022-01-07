import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnListComponent } from './return-list/return-list.component';
import { ReturnCreateComponent } from './return-create/return-create.component';
import { ReturnUpdateComponent } from './return-update/return-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ReturnListComponent,
    ReturnCreateComponent,
    ReturnUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ReturnModule { }
