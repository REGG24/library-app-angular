import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../interfaces/author';
import { CustomResponse } from '../interfaces/custom-resonse';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  readonly baseURL = `${environment.baseURL}/author`;

  authorChanged$ = new Subject<Author[]>();

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

  create(data: Author): Observable<any> {
    return this.httpClient
    .post(`${this.baseURL}/save`, data)
    .pipe(
      tap(()=>{
        this.authorChanged$.next();
      })
    );
  }

  update(id: number, data: Author): Observable<any> {
    return this.httpClient
    .put(`${this.baseURL}/update/${id}`,data)
    .pipe(
      tap(()=>{
        this.authorChanged$.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient
    .delete(`${this.baseURL}/delete/${id}`)
    .pipe(
      tap(()=>{
        this.authorChanged$.next();
      })
    );
  }
}
