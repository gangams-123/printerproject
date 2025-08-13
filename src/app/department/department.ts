import { Component} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridAngular } from "ag-grid-angular";
import { Depatmentservice } from './depatmentservice';


@Component({
  selector: 'app-department',
  imports: [AgGridAngular],
  templateUrl: './department.html',
  styleUrl: './department.css'
})
export class Department {
private gridApi!: GridApi;
 rowData: any[] = [];
 columnDefs: ColDef[] = [
    { field: 'name', headerName: ' Department Name', editable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        if (params.data.isNew) {
          return `
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
          `;
        } else {
          return `<button class="delete-btn">Delete</button>`;
        }
      },
      width: 150
    }
  ];
  defaultColDef: ColDef = {
    flex: 1,
    editable: true
  };
  constructor(private depatmentservice:Depatmentservice) {}
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
       this.depatmentservice.getAllDepts().subscribe({
            next: (response) => {
            console.log('API Response:', response);
            this.rowData = response; // since it's already an array
             this.gridApi.setGridOption('rowData', this.rowData);
          },
          error: (err) => console.error('Error loading branches:', err)
  });
    // Listen for button clicks inside grid
    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.colDef.headerName === 'Actions') {
        if (event.event.target.classList.contains('save-btn')) {
          this.saveRow(event.data);
        }
        if (event.event.target.classList.contains('delete-btn')) {
          this.deleteRow(event.data);
        }
      }
    });
  }
  addRow() {
  const newRow = { id: '', name: '', age: '', isNew: true };
  this.gridApi.applyTransaction({ add: [newRow] });
}

  saveRow(row: any) {
    console.log('Saving row to backend:', row);
    this.depatmentservice.createDept(row).subscribe({
       next: (response) => {
            console.log('API Response:', response);
            console.log("data added");
          },
          error: (err) => console.error('Error loading branches:', err)
    });

    row.isNew = false;
    this.gridApi.refreshCells({ force: true });
  }
deleteRow(row: any) {

  console.log('Deleted row:', row.id);
  const data={'id':Number(row.id)};
    this.depatmentservice.deletDept(data).subscribe({
        next: (response) => {
                  this.gridApi.applyTransaction({ remove: [row] });
          },
           error: (err) => console.error('Error loading branches:', err)
     });
}
}


