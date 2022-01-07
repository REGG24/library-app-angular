import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { ReturnListComponent } from './return/return-list/return-list.component';
import { SaleListComponent } from './sale/sale-list/sale-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'clients', component: ClientListComponent},
  { path: 'books', component: BookListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'sales', component: SaleListComponent },
  { path: 'loans', component: LoanListComponent },
  { path: 'returns', component: ReturnListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
