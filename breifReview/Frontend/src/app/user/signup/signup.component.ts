import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  passwordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.form.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  submitted = false;
  constructor(private router:Router,private formBuilder: FormBuilder, private authService: UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['',
          [
            Validators.required,
            Validators.pattern(/^[A-Za-z\s]+$/),
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', [Validators.required, this.passwordValidator]],

      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    console.warn(this.form.value);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    this.register(this.form.value);
  }
  success: boolean = false;
  userExits: boolean = false;
  errorOccured: boolean = false;
  register(signUp: any) {
    this.authService.signUp(signUp).subscribe(
      (res) => {
        if (res != null) {
          this.success = true;
          this.submitted = false;
          this.form.reset();
        }
        else if (res.status === 406) {
          this.userExits = true;
        }
        else if (res.status === 400) {
          this.userExits = true;
        }
        console.log(res);
        console.log(res.status);
      },
      (error) => {
        this.success=false;
        this.userExits = true;
        //this.errorOccured=true;
      });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  goToLoginPage(){
    this.router.navigateByUrl("users/login");
  }

}
