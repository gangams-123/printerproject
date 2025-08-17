import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Designationservice {
     private apiUrl = 'http://localhost/php/api/designationMaster';
     constructor(private http: HttpClient) {}

  createDesignation(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
  }
  getAllDesignation(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getDesignationByDeptId(deptId:any): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: { departmentId: deptId }
    });
  }

deleteDesignation(data: any): Observable<any> {
  return this.http.delete(this.apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}  
}
