import { title } from "process";

export const list=[
     {
      number: '1',
      title: 'Masters',
      icon: 'dashboard',
      open: false,
      children:
       [{
          number:'1.1',
          title:'General',
           icon: 'dashboard',
           open: false,
           children:
           [{ 
                title:'Branch/Francise Master',
                routerLink:'/branchesm',
                 queryParam:{view:true}
           },
           {
                title:'Department Master',
                routerLink:'/departmentm',
           },
           {
               title:'Designation Master',
              routerLink:'/designationm',
           }]
       } ,{
          number:'1.2',
          title:'Users',
           icon: 'dashboard',
           open: false,
            children:
           [{ 
                title:'Officials',
                routerLink:'/officialsm',
                 queryParam:{view:true}
           },
           {
                title:'Custmers',
                routerLink:'/customersm',
                 queryParam:{view:true}
           }]
       }             
       ]
    },
    {
      number: '2',
      title: 'Reports',
      icon: 'bar_chart',
      open: false,
      children: [
        {
          number: '2.1',
          title: 'Sales',
          open: false,
          children: [
            {
              number: '2.1.1',
              title: 'Monthly Report',
              routerLink: '/reports/monthly'
            },
            {
              number: '2.1.2',
              title: 'Yearly Report',
              routerLink: '/reports/yearly'
            }
          ]
        },
        {
          number: '2.2',
          title: 'Inventory',
          routerLink: '/reports/inventory'
        }
      ]
    }
  ];