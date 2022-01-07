import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientUpdateComponent } from './client-update/client-update.component';



@NgModule({
  declarations: [
    ClientListComponent,
    ClientCreateComponent,
    ClientUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ClientModule { }
