import { Component} from '@angular/core';

import { Router,RouterModule} from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Country, State,  IState } from 'country-state-city';

import { Officialsservice } from './officialsservice';

 import { FormsModule } from '@angular/forms'; 

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../branch-master/branch-service';
import { Depatmentservice } from '../department/depatmentservice';
import {Designationservice} from '../designation/designationservice';

import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css'; // Required base styles for new Theming API
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { themeQuartz } from 'ag-grid-community';

import {ColDef,GridApi,GridReadyEvent} from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all community features once in your app (can be in main.ts too)
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-officials',
  imports: [ CommonModule,
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
  templateUrl: './officials.html',
  styleUrl: './officials.css'
})
export class Officials {
  countries: any[] = [];
 states: IState[] = [];
  view=true;
  rowData: any[] = [];
    columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
  { headerName: 'First Name', field: 'firstname' },
 { headerName: 'Middle Name', field: 'midname' },
   { headerName: 'Last Name', field: 'lastname' },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Website', field: 'url' },
  { headerName: 'Phone No', field: 'mobile' }
  ];
  officialForm = new FormGroup({
    fname: new FormControl(''),
    mname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    guardianname: new FormControl(''),
    guardiannum: new FormControl(''),
    relationship: new FormControl(''),
    mobile:new FormControl(''),
    joiningdate:new FormControl(''),
    basicsal:new FormControl(''),
    pf:new FormControl(''),
    esi:new FormControl(''),
    pfno:new FormControl(''),
    esino:new FormControl(''),
    branchId:new FormControl(''),
    departmentId:new FormControl(''),
    designationId:new FormControl(''),
    inputAddress: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    selectedCountry:new FormControl(''),
    city: new FormControl(''),
    zip:new FormControl(''),
  });
    gridApi!: GridApi;
  rowSelection: 'single' | 'multiple' = 'multiple';
  pfBox=false;
  esiBox=false;
  deptList: any[] = [];
  designationList: any[] = [];
  branchList:any[]=[];
   gridOptions = {
      theme: themeQuartz
    };
    constructor(private fb: FormBuilder,private officialsservice: Officialsservice,
      private route: ActivatedRoute,private router:Router,private depatmentservice:Depatmentservice,private designationservice:Designationservice,
      private branchService:BranchService) {}
   ngOnInit(): void {
      this.countries= Country.getAllCountries();
    this.route.queryParams.subscribe(params => {
      if (params['view'] !== undefined) {
        this.view = (params['view'] == 'true');
      }
    });
    this.branchService.getAllBranches().subscribe({
        next: (response) =>{ this.branchList=response;},
      error: (err) => console.error('Error:', err)
    });
    this.depatmentservice.getAllDepts().subscribe({
      next: (response) => {this.deptList=response;},
      error: (err) => console.error('Error:', err)
    })
         
  }  
   onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
   this.gridApi.autoSizeAllColumns();
     this.officialsservice.getAllOfficial().subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.rowData = response; // since it's already an array
          this.gridApi.setGridOption('rowData', this.rowData);
        },
        error: (err) => console.error('Error loading branches:', err)
  });
  }
  onCountryChange() {
    if ( this.officialForm.value.country!=null) {
      const selCountry = JSON.parse(this.officialForm.value.country);
         this.officialForm.patchValue({ selectedCountry: selCountry.name});
      this.states = State.getStatesOfCountry(selCountry.isoCode);
      this.officialForm.patchValue({ state: '', city: '' }); 
    }
  }
   onSubmit() {
    console.log(this.officialForm.value);
      this.officialsservice.createOfficial(this.officialForm.value).subscribe({
      next: (response) => {
                            console.log('Success:', response),
                            this.router.navigate(['/officialsm'], { queryParams:{view:true}});
      },
      error: (err:any) => console.error('Error:', err)
    });
  }
  addOfficials(){
      this.router.navigate(['/officialsm'], { queryParams:{view:false}});
  }
  toggleTextbox(){
    this.pfBox=true;
  }
    toggleTextboxForesi(){
    this.esiBox=true;
  }
  onDepartmentChange(deptId: number) {
  console.log('Selected Department ID:', deptId);
 this.designationservice.getDesignationByDeptId(deptId).subscribe((res: any) => {
    this.designationList = res;
  });
}

}
