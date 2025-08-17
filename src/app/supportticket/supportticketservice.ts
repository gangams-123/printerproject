import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketStatus } from '../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class Supportticketservice {
   private apiUrl = 'http://localhost/php/api/ticket';
  constructor(private http: HttpClient) {}

  createTicket(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);//{ status: [1, 2, 3] })
  }
  getTicketsByAssigneeAndStatus(): Observable<any> {
  return this.http.get(this.apiUrl, {
  params: {
    status: [TicketStatus[0].id, TicketStatus[1].id,TicketStatus[2].id].join(","), // "1,2,3"
    assignee: "3"
  }
});
  }
}
