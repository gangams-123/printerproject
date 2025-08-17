import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Country, State,  IState } from 'country-state-city';
import { MatIconModule } from '@angular/material/icon';
import { BranchService } from '../branch-master/branch-service';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { themeQuartz } from 'ag-grid-community';
import {ColDef,GridApi,GridReadyEvent} from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-branch-master',
  standalone: true, 
  imports: [
    CommonModule,
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
    AgGridAngular,RouterModule
  ],
  templateUrl: './branch-master.html',
  styleUrls: ['./branch-master.css'] 
})
export class BranchMaster {
  countries: any[] = [];
 states: IState[] = [];
  view=true;
  rowData: any[] = [];
    columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
  { headerName: 'Name', field: 'name' },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Website', field: 'url' },
  { headerName: 'Phone No', field: 'phoneNo' }
  ];

  branchForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    url: new FormControl(''),
    landline: new FormControl(''),
    mobile: new FormControl(''),
    branchType: new FormControl(''),
    eDate: new FormControl(''),
    inputAddress: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    selectedCountry:new FormControl(''),
    city: new FormControl(''),
    zip:new FormControl(''),
    logo: new FormGroup({
        fileName: new FormControl<string | null>(null),
        blob: new FormControl<string | null>(null),
        size: new FormControl<number | null>(null)
      })
  });
  gridApi!: GridApi;
  rowSelection: 'single' | 'multiple' = 'multiple';
   gridOptions = {
 theme: themeQuartz
};
 
  constructor(private fb: FormBuilder,private branchService: BranchService,private route: ActivatedRoute,private router:Router
  ) {}
  ngOnInit(): void {
     this.countries= Country.getAllCountries();
    this.route.queryParams.subscribe(params => {
    if (params['view'] !== undefined) {
      this.view = (params['view'] == 'true');
    }
  });       
}
 onGridReady(params: GridReadyEvent) {
 
    this.gridApi = params.api;
   this.gridApi.autoSizeAllColumns();
     this.branchService.getAllBranches().subscribe({
            next: (response) => {
            console.log('API Response:', response);
            this.rowData = response; // since it's already an array
             this.gridApi.setGridOption('rowData', this.rowData);
          },
          error: (err) => console.error('Error loading branches:', err)
  });
  }


  onCountryChange() {
    if ( this.branchForm.value.country!=null) {
      const selCountry=JSON.parse(this.branchForm.value.country);
         this.branchForm.patchValue({ selectedCountry: selCountry.name});
      this.states = State.getStatesOfCountry(selCountry.isoCode);
      this.branchForm.patchValue({ state: '', city: '' }); 
    }
  }

  onSubmit() {
    console.log(this.branchForm.value);
      this.branchService.createBranch(this.branchForm.value).subscribe({
      next: (response) => console.log('Success:', response),
      error: (err) => console.error('Error:', err)
    });
  }
 
selectedFile?: File;
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedFile=file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.branchForm.get('logo')?.patchValue({
        blob: base64String,
        fileName: file.name,
        size: file.size
      });
    }
  }
}
addBranch(){
  this.router.navigate(['/branchesm'], { queryParams:{view:false}});
}

}
