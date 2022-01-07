import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../interfaces/custom-resonse';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly baseURL = `${environment.baseURL}/employee`;
  
  employeesChanged$ = new Subject<Employee[]>();

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list`);
  }

  readByName(name: string): Observable<CustomResponse> {
    return this.httpClient.get<CustomResponse>(`${this.baseURL}/list/${name}`);
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get/${id}`);
  }

  create(data: Employee): Observable<any> {
    return this.httpClient
    .post(`${this.baseURL}/save`, data)
    .pipe(
      tap(()=>{
        this.employeesChanged$.next();
      })
    );
  }

  update(id: number, data: Employee): Observable<any> {
    return this.httpClient
    .put(`${this.baseURL}/update/${id}`,data)
    .pipe(
      tap(()=>{
        this.employeesChanged$.next();
      })
    );
  }

  delete(id: number):Observable<any> {
    return this.httpClient
    .delete(`${this.baseURL}/delete/${id}`)
    .pipe(
      tap(()=>{
        this.employeesChanged$.next();
      })
    );
  }

}
