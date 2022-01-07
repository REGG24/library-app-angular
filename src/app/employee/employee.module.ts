import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeUdateComponent } from './employee-udate/employee-udate.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeUdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents:[
    EmployeeCreateComponent
  ]
})
export class EmployeeModule { }
