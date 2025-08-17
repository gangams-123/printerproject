import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Categoryservice {
  
  private apiUrl = 'http://localhost/php/api/categoryMaster';
     constructor(private http: HttpClient) {}

  createCategory(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
deleteCategory(data: any): Observable<any> {
  return this.http.delete(this.apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    body: data
  });
}
}

