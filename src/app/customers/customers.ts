import { Component} from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Country, State,  IState } from 'country-state-city';
 import { FormsModule } from '@angular/forms'; 
// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css'; // Required base styles for new Theming API
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { themeQuartz } from 'ag-grid-community';
import {ColDef,GridApi,GridReadyEvent} from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { Categoryservice } from '../category/categoryservice';
import { Customersservice } from './customersservice';
@Component({
  selector: 'app-customers',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridAngular,
    RouterModule,
    MatCheckboxModule
    ,FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {
    countries: any[] = [];
 states: IState[] = [];
  view=true;
  rowData: any[] = [];
  catList:any[]=[];
    columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
  { headerName: 'Name', field: 'cname' },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Website', field: 'url' },
  { headerName: 'Phone No', field: 'phoneNo' }
  ];
  customerForm = new FormGroup({
     cname: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    categoryId: new FormControl(''),
    url: new FormControl(''),
    taxexemptions: new FormControl(''),
    email:new FormControl(''),
    panno: new FormControl(''),
    gst: new FormControl(''),
    billingcycle: new FormControl(''),
    mobile:new FormControl(''),
    inputAddress: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    selectedCountry:new FormControl(''),
    city: new FormControl(''),
    zip:new FormControl(''),
  });
  gridApi!: GridApi;
  rowSelection: 'single' | 'multiple' = 'multiple';
  gridOptions = {
    theme: themeQuartz
  };
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private router:Router,private categoryservice:Categoryservice,private customersservice:Customersservice) {}
   ngOnInit(): void {
      this.countries= Country.getAllCountries();
    this.route.queryParams.subscribe(params => {
      if (params['view'] !== undefined) {
        this.view = (params['view'] == 'true');
      }
    });
    this.categoryservice.getAllCategories().subscribe({
      next: (response) =>{ this.catList=response;},
      error: (err) => console.error('Error:', err)
    });
  }
  onCountryChange() {
    if ( this.customerForm.value.country!=null) {
      const selCountry=JSON.parse(this.customerForm.value.country);
         this.customerForm.patchValue({ selectedCountry: selCountry.name});
      this.states = State.getStatesOfCountry(selCountry.isoCode);
      this.customerForm.patchValue({ state: '', city: '' }); 
    }
  }
 onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
   this.gridApi.autoSizeAllColumns();
     this.customersservice.getAllCustomsers().subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.rowData = response; // since it's already an array
          this.gridApi.setGridOption('rowData', this.rowData);
        },
        error: (err) => console.error('Error loading branches:', err)
  });
  }
  onSubmit() {
    console.log(this.customerForm.value);
      this.customersservice.createcustomer(this.customerForm.value).subscribe({
      next: (response) => {
                            console.log('Success:', response),
                            this.router.navigate(['/customersm'], { queryParams:{view:true}});
      },
      error: (err) => console.error('Error:', err)
    });
  }
  addCustomer(){
      this.router.navigate(['/customersm'], { queryParams:{view:false}});
  }
}  
