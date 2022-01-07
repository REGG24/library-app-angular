import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { CustomResponse } from '../interfaces/custom-resonse';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly baseURL = `${environment.baseURL}/client`;

  clientChanged$ = new Subject<Client[]>();

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list`);
  }

  getByName(name: string): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list/${name}`);
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get/${id}`);
  }

  create(data: Client): Observable<any> {
    return this.httpClient
    .post(`${this.baseURL}/save`, data)
    .pipe(
      tap(()=>{
        this.clientChanged$.next();
      })
    );
  }

  update(id: number, data: Client): Observable<any> {
    return this.httpClient
    .put(`${this.baseURL}/update/${id}`,data)
    .pipe(
      tap(()=>{
        this.clientChanged$.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient
    .delete(`${this.baseURL}/delete/${id}`)
    .pipe(
      tap(()=>{
        this.clientChanged$.next();
      })
    );
  }

}
