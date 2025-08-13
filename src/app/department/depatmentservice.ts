import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Depatmentservice {
   private apiUrl = 'http://localhost/php/api/deptMaster';
     constructor(private http: HttpClient) {}

  createDept(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllDepts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
deletDept(data: any): Observable<any> {
  return this.http.delete(this.apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}
}
