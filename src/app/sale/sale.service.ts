import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sale } from '../interfaces/sale';
import { CustomResponse } from '../interfaces/custom-resonse';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  readonly baseURL = `${environment.baseURL}/sale`;

  saleChanged$ = new Subject<Sale[]>();

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list`);
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get/${id}`);
  }

  create(data: Sale): Observable<any> {
    return this.httpClient
    .post(`${this.baseURL}/save`, data)
    .pipe(
      tap(()=>{
        this.saleChanged$.next();
      })
    );
  }

  update(id: number, data: Sale): Observable<any> {
    console.log('data',data);
    return this.httpClient
    .put(`${this.baseURL}/update/${id}`,data)
    .pipe(
      tap(()=>{
        this.saleChanged$.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient
    .delete(`${this.baseURL}/delete/${id}`)
    .pipe(
      tap(()=>{
        this.saleChanged$.next();
      })
    );
  }
}
