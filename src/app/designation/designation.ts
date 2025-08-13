import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridAngular } from 'ag-grid-angular';
import { Depatmentservice } from '../department/depatmentservice';
import { Designationservice } from './designationservice';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './designation.html',
  styleUrls: ['./designation.css']
})
export class Designation implements OnInit {
  private gridApi!: GridApi;
  rowData: any[] = [];
  dropdownOptions: { id: number; name: string }[] = [];
  deptList: any[] = [];
  columnDefs: ColDef[] = [
    {
      field: 'designationName',
      headerName: 'Designation Name',
      editable: params => params.data.isNew === true
    },
       {
        headerName: 'Department',
        field: 'departmentId',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: () => {
          return {
            values: this.deptList.map(d => d.id.toString())
          };
        },
        valueFormatter: (params) => {
          const dept = this.deptList.find(d => d.id == params.value);
          return dept ? dept.name : '';
        }, valueParser: (params) => Number(params.newValue)
      },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        if (params.data.isNew) {
          return `<button class="save-btn">Save</button> <button class="delete-btn">Delete</button>`;
        } else {
          return `<button class="delete-btn">Delete</button>`;
        }
      }
    }
  ];

  defaultColDef: ColDef = {
    flex: 1
  };

  constructor(
    private designationservice: Designationservice,
    private depatmentservice: Depatmentservice
  ) {}

  ngOnInit() {
    this.depatmentservice.getAllDepts().subscribe((data: any) => {
      this.deptList = data; // [{id, name}]
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
       this.designationservice.getAllDesignation().subscribe({
            next: (response) => {
            console.log('API Response:', response);
            this.rowData = response; // since it's already an array
             this.gridApi.setGridOption('rowData', this.rowData);
          },
            error: (err) => console.error('Error loading branches:', err)
        });

    // Button click handling for save/delete inside grid
    this.gridApi.addEventListener('cellClicked', (event: any) => {
      if (event.event.target.classList.contains('save-btn')) {
        console.log('Saving row:', event.data);
       this.designationservice.createDesignation(event.data).subscribe({
        next: (response) => {
            console.log('API Response:', response);
            console.log("designation added");
          },
          error: (err) => console.error('Error loading branches:', err)
    });
        event.data.isNew = false;
        this.gridApi.refreshCells();
      }
      if (event.event.target.classList.contains('delete-btn')) {
        console.log(event.data);
        const data=event.data;
        const id={'id':Number(data.designationId)};
         this.designationservice.deleteDesignation(id).subscribe({
        next: (response) => {
            console.log('API Response:', response);
            console.log("designation deleted");
            this.gridApi.applyTransaction({ remove: [event.data] });
          },
          error: (err) => console.error('Error loading branches:', err)
    });
        
      }
    });
  }

  addRow() {
    const newRow = { name: '', departmentId: null, isNew: true };
    this.gridApi.applyTransaction({ add: [newRow] });
  }
}
