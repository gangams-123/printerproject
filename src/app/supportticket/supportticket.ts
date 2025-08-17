import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import 'flatpickr/dist/flatpickr.min.css'; 
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Supportticketservice } from './supportticketservice';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {Observable, of } from 'rxjs';
import {CommonModule} from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Customersservice } from '../customers/customersservice';
import { ReactiveFormsModule } from '@angular/forms';
import { Officialsservice } from '../officials/officialsservice';
import { TicketStatus, Priority } from '../constants/constants';
import flatpickr from 'flatpickr';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css'; // Required base styles for new Theming API
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { themeQuartz } from 'ag-grid-community';

import {ColDef,GridApi,GridReadyEvent} from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketDetailsDialog } from '../ticket-details-dialog/ticket-details-dialog';
@Component({
  selector: 'app-supportticket',
  imports: [MatToolbarModule,MatIconModule,MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,MatButtonModule,CommonModule,ReactiveFormsModule,MatSelectModule,
  MatDatepickerModule,AgGridAngular,MatDialogModule],
  templateUrl: './supportticket.html',
  styleUrl: './supportticket.css'
})
export class Supportticket implements AfterViewInit  {
    customer:any={};
     official: any[] = [];
    searchControl = new FormControl('');
  filteredOptions$: Observable<any[]> = of([]);
 gridOptions = {
      theme: themeQuartz
    };
       columnDefs: ColDef[] = [
  { headerName: 'Ticket Description', field: 'description' },
 { headerName: 'Customer', field: 'cname' },
   { headerName: 'Contact Person', field: 'contactperson' },
   {
      headerName: 'Actions',
      field: 'id',
      cellRenderer: () => `<button class="btn-view">View</button>`,
      onCellClicked: (params: any) => {
        this.openChildDialog(params.data);
      }
    }
  ];

    ticketForm = new FormGroup({
    custId: new FormControl(''),
    description: new FormControl(''),
    appointmentdate: new FormControl(''),
    contactperson: new FormControl(''),
    contactnum:new FormControl(''),
    contactemail:new FormControl(''),
    assignee:new FormControl(''),
    status:new FormControl(''),
    priority:new FormControl('')
 }); 
   view=true;
priorities=Priority;
  constructor(private http: HttpClient,private customersservice:Customersservice,private router:Router,
    private officialsservice:Officialsservice,private cd: ChangeDetectorRef, private route: ActivatedRoute,
    private supportticketservice:Supportticketservice,private dialog: MatDialog) {}
   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['view'] !== undefined) {
        this.view = (params['view'] == 'true');
      }
    });
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (typeof value !== 'string' || !value.trim()) {
          return of([]);
        }
        return this.customersservice.getCustomersByText(value);
      })
    ); 
      this.officialsservice.getAllOfficial().subscribe({
        next:(response)=>{ this.official=response;
          console.log(this.official);
        },
        error: (err) => console.error('Error loading official:', err)
      });    
  }
 openChildDialog(ticket: any) {
    this.dialog.open(TicketDetailsDialog, {
      width: '800px',
      data: ticket
    });
  }

  private flatpickrInstance: flatpickr.Instance | undefined;  
optionSelected(option: any) {
  // If your mat-option is [value]="option", you'll have full data here
  const custId = typeof option === 'object' ? option.id : option;
  console.log(custId);
  this.ticketForm.patchValue({custId:custId});
  this.customersservice.getCustomersByid(Number(custId)).subscribe({
    next: (response) => {
      this.customer = response;
    },
    error: (err) => console.error('Error loading customer:', err)
  });
}
   gridApi!: GridApi;
     rowData: any[] = [];
  rowSelection: 'single' | 'multiple' = 'multiple';
   onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
   this.gridApi.autoSizeAllColumns();
     this.supportticketservice.getTicketsByAssigneeAndStatus().subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.rowData = response; // since it's already an array
          this.gridApi.setGridOption('rowData', this.rowData);
        },
        error: (err) => console.error('Error loading branches:', err)
  });
  }
  onSubmit(){
    this.ticketForm.patchValue({ status:String(TicketStatus[0].id) });
    console.log(this.ticketForm.value);
    this.supportticketservice.createTicket(this.ticketForm.value).subscribe({
      next: (response) => {
                            console.log('Success:', response),
                            this.router.navigate(['/ticketm'], { queryParams:{view:true}});
      },
      error: (err:any) => console.error('Error:', err)
    });
  }
  
@ViewChild('dateTimeInput', { static: false }) dateTimeInput!: ElementRef<HTMLInputElement>;
  private fpInstance: flatpickr.Instance | null = null;


  ngAfterViewInit() {
    console.log("ngAfterViewInit running...");

    if (!this.dateTimeInput) {
      console.error("❌ dateTimeInput not found");
      return;
    }

    this.fpInstance = flatpickr(this.dateTimeInput.nativeElement, {
      enableTime: true,
      dateFormat: 'Y-m-d h:i K',
      time_24hr: false,
      defaultDate: new Date(),
     position: "above", 
     onChange: (_selectedDates: Date[], dateStr: string) => {
          this.ticketForm.get('appointmentdate')?.setValue(dateStr); 
          console.log(this.ticketForm.value);
        }
    });

    console.log("✅ Flatpickr initialized", this.fpInstance);
  }

  openPicker() {
    if (this.fpInstance) {
      console.log("📅 Opening picker...");
      this.fpInstance.open();
    } else {
      console.error("❌ Flatpickr not initialized yet");
    }
  }
  addTicket(){
     this.router.navigate(['/ticketm'], { queryParams:{view:false}});
  }
}

