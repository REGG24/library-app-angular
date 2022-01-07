import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../interfaces/custom-resonse';
import { Loan } from '../interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  readonly baseURL = `${environment.baseURL}/loan`;

  loanChanged$ = new Subject<Loan[]>();

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list`);
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get/${id}`);
  }

  create(data: Loan): Observable<any> {
    return this.httpClient
    .post(`${this.baseURL}/save`, data)
    .pipe(
      tap(()=>{
        this.loanChanged$.next();
      })
    );
  }

  update(id: number, data: Loan): Observable<any> {
    console.log('data',data);
    return this.httpClient
    .put(`${this.baseURL}/update/${id}`,data)
    .pipe(
      tap(()=>{
        this.loanChanged$.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient
    .delete(`${this.baseURL}/delete/${id}`)
    .pipe(
      tap(()=>{
        this.loanChanged$.next();
      })
    );
  }

}
