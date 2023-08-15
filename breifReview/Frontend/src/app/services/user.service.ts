import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { userLogin } from '../data-type';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role"
const USERNAME ="I_name"

export const AUTH_HEADER = "authorization";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor( private http: HttpClient, private storageService:LocalStorageService){}
  url="http://localhost:8082";
  signUp(signUpDTO : any): Observable<any> {
      console.log("service called");
      return this.http.post<[]>(this.url+"/sign-up",signUpDTO);
  }
  userLogin(username:string, password:string): any{
    return this.http.post<[]>(this.url+"/authenticate",
    {username,password},
    {observe: 'response'})
    .pipe(
      tap(_ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          if(res.body.role==="USER"){
            this.storageService.saveUserName(res.body.name);
            this.storageService.saveUserId(res.body.userId);
            this.storageService.saveUserRole(res.body.role);
            const authorizationHeader = res.headers.get(AUTH_HEADER);
            if(authorizationHeader!==null){
              const tokenLength = authorizationHeader.length;
              const bearerToken = authorizationHeader.substring(7, tokenLength);
              this.storageService.saveToken(bearerToken);
            }
            return res;
          }
          return null;
          
        }));
  }
  isLoggedIn(){
    if(localStorage.getItem(TOKEN)===null){
      return false;
    }
    return true;
  }
  log(message: string): void {
    console.log(`User Auth Service: ${message}`)
  }
  isUserLoggedIn():boolean{
    if(localStorage.getItem(USERROLE)==="USER"){
      return true;
    }
    return false;
  }
  isAdminLoggedIn(){
    if(localStorage.getItem(USERROLE)==="ADMIN"){
      return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERID);
    localStorage.removeItem(USERROLE);
  }
}
