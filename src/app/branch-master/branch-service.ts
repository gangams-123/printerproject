import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BranchService {
 private apiUrl = 'http://localhost/php/api/branchMaster';
  constructor(private http: HttpClient) {}

  createBranch(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllBranches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
