import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private router: Router, private locationStrategy:LocationStrategy) { }
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
      }
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
    }
    console.log(JSON.stringify(this.loginForm.value, null, 2));
    this.loginUser();
  }
  loginFailed: boolean = false;
  loginUser() {
    this.adminService.adminLogin(this.loginForm.value['username'],this.loginForm.value['password']).subscribe((result: any) => {
      console.log(result);
      if (result != null ) {
        this.submitted = true;
        //window.location.href="/admin/reviews";
        //console.log(localStorage.getItem("I_role")=="ADMIN")
        window.location.href="/admin/reviews"
        //this.router.navigate(['/admin/reviews'])
        }
        else{
          this.loginFailed = true;
        }
    },
    (error: any)=>{
      this.loginFailed = true;
    }
  );
}
}


