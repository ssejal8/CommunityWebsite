import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  userloginFailed: boolean = false;
  adminloginFailed:boolean = false;
  constructor(private userService: UserService,private adminService:AdminService, private formBuilder: FormBuilder, private router: Router, private locationStrategy:LocationStrategy) { }
  loginForm: FormGroup = new FormGroup({

    username: new FormControl(''),
    password: new FormControl(''),

  });

  submitted = false;

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40)
          ]
        ]
      },
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  onSubmit(): void {
    
    console.warn(this.loginForm.value);
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
        // this.adminloginFailed = false;
        // this.userloginFailed = false;
    }
    console.log(JSON.stringify(this.loginForm.value, null, 2));
    this.loginUser();
    this.adminLogin();
  }
  
  
  loginUser() {
    this.userService.userLogin(this.loginForm.value['username'],this.loginForm.value['password']).subscribe(
      (result: any) => {
      console.log(result);
      if (result != null) {
        this.submitted = true;
        window.location.href="product/products";
      }
      else {
        this.userloginFailed = true;
      }
    },
      (error:any)=>{
        this.userloginFailed = true;
      }
    );
  }

  adminLogin() {
    this.adminService.adminLogin(this.loginForm.value['username'],this.loginForm.value['password']).subscribe((result:any) => {
      console.log(result);
      if (result != null ) {
        this.submitted = true;
        
        window.location.href="/admin/reviews"
        
        }
        else{
          this.adminloginFailed = true;
        }
    },
    (error:any)=>{
      this.adminloginFailed = true;
    }
  );
}
}
