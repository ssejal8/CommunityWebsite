import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

const USERNAME = "I_name";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit{
  
  isUserLoggedIn:boolean = false;
  isAdminLoggedIn:boolean =false;
  isLoggedIn:boolean =false;
  name: string|null|undefined;
  constructor(private router: Router, private userService: UserService){}
  ngOnInit(): void {
    this.UserLoggedIn();
    this.AdminLoggedIn();
    this.LoggedIn();

  }
  LoggedIn(){
    this.isLoggedIn = this.userService.isLoggedIn();
  }
  UserLoggedIn(){
    this.isUserLoggedIn = this.userService.isUserLoggedIn();
    this.name = localStorage.getItem(USERNAME);
  }

  AdminLoggedIn(){
    this.isAdminLoggedIn = this.userService.isAdminLoggedIn();
  }

  logoutUser(){
    LocalStorageService.signOut();
    this.isUserLoggedIn = false;
    this.goToHomePage(); 
  }

  goToLoginPage(){
    this.router.navigateByUrl("users/login");
  }
  goToAdminLoginPage(){
    this.router.navigateByUrl("/admin/login");
  }

  goToProductPage(){
    this.router.navigateByUrl("/product/products");
  }
  goToHomePage(){
    window.location.href="";
  }

}
