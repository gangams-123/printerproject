import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {TicketStatus} from '../constants/constants';
import { Supportticket } from '../supportticket/supportticket';
@Component({
  selector: 'app-ticket-details-dialog',
  imports: [CommonModule,
    ReactiveFormsModule,  
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './ticket-details-dialog.html',
  styleUrl: './ticket-details-dialog.css'
})
export class TicketDetailsDialog {
  status= TicketStatus ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
   followUpDetails = new FormGroup({
      comments:new FormControl(''),
       status:new FormControl('')
   });
      ngOnInit() {
         console.log(this.data.status);
        console.log(this.data);
        this.followUpDetails.patchValue({status:this.data.status});
      } 
   save(){

   }
   onCancel(){

   }
}
