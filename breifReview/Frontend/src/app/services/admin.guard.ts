import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate{
 
    constructor(private userService:UserService,private adminService:AdminService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if(localStorage.getItem("I_role") =="ADMIN"){
          console.log(localStorage.getItem("I_role"))
        return true;
      }
      window.location.href="product/products";
      return false; 
    }
  }
  
