import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Billingcycleservice {
  private apiUrl = 'http://localhost/php/api/billingcycle';
     constructor(private http: HttpClient) {}

  createCycle(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllCycles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
deleteCycle(data: any): Observable<any> {
  return this.http.delete(this.apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}
}
