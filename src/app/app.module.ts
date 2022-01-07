import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeModule } from './employee/employee.module';
import { ClientModule } from './client/client.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './shared/modals/error/error.component';
import { DeleteWarningComponent } from './shared/modals/delete-warning/delete-warning.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { SaleModule } from './sale/sale.module';
import { LoanModule } from './loan/loan.module';
import { ReturnModule } from './return/return.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DeleteWarningComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    ClientModule,
    BookModule,
    AuthorModule,
    SaleModule,
    LoanModule,
    ReturnModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
