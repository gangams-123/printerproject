import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Officialsservice {
   private apiUrl = 'http://localhost/php/api/officials';
  constructor(private http: HttpClient) {}

  createOfficial(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllOfficial(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
