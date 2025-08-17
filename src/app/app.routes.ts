import { Routes } from '@angular/router';
import {Userlogin} from './userlogin/userlogin'
import { Branches } from './branches/branches';
import { MainPage } from './main-page/main-page';
import { Landing} from './landing/landing';
import { BranchMaster } from './branch-master/branch-master';
import { Department } from './department/department';
import { Designation } from './designation/designation';
import { Officials } from './officials/officials';
import { Customers } from './customers/customers';
import { Billingcycle } from './billingcycle/billingcycle';
import { Category } from './category/category';
import { Supportticket } from './supportticket/supportticket';
export const routes: Routes = [
      { path: '', component: Userlogin,pathMatch:'full' }, // Default route
     { path: 'login', component: Userlogin},
     {path:'branches',component:Branches},
     {path:'',component:Landing,
        children :
      [
              {path:'mainp',component:MainPage},
            {
                path:'branchesm',
                component:BranchMaster
            },
             {
                path:'departmentm',
                component:Department
            },
             {
                path:'designationm',
                component:Designation
            },
             {
                path:'officialsm',
                component:Officials
            },
             {
                path:'customersm',
                component:Customers
            },
             {
                path:'categorym',
                component:Category
            }, {
                path:'billingCyclem',
                component:Billingcycle
            }, {
                path:'ticketm',
                component:Supportticket
            }
      ]
     },
];

