import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Userloginservice {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost/php/userlogin.php';
 
  validateUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data,{ responseType: 'json' });
  }
}
