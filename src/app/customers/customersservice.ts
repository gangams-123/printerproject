import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Customersservice {
   private apiUrl = 'http://localhost/php/api/customer';
  constructor(private http: HttpClient) {}

  createcustomer(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllCustomsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getCustomersByText(name:any): Observable<any> {
    return this.http.get(this.apiUrl , {
      params: { name: name }
    });
  }  
   getCustomersByid(id:any): Observable<any> {
    return this.http.get(this.apiUrl , {
      params: { id: id }
  });
  }
}

