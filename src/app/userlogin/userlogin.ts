import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {Userloginservice} from './userloginservice';
import { Router,RouterModule} from '@angular/router';
@Component({
  selector: 'app-userlogin',
  imports: [FormsModule,RouterModule],
  templateUrl: './userlogin.html',
  styleUrl: './userlogin.css'
})
  
export class Userlogin {
credentials = { username: '', password: '' };
     constructor(private userloginservice: Userloginservice,private router: Router) { }
  

   onClickLogin(f: NgForm) {
    alert();
    this.router.navigateByUrl('/branches');
    // this.userloginservice.validateUser(this.credentials).subscribe(
    // (data:any) =>{
    //         console.log('regd');
    //         this.router.navigateByUrl('/branches');
    //       },
    //       error => {
    //         // Handle login error (e.g., display error message)
    //         console.error(error);
    //       }
    // );
  }
}
