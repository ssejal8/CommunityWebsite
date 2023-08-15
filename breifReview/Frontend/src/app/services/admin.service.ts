import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role"
export const AUTH_HEADER = "authorization";
const BASE_URL ="http://localhost:8082/";
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  rejectReview(reviewId: any) {
    console.log("service called")
    return this.http.delete(BASE_URL+"api/deletereview/"+reviewId)
  }
  approveReview(reviewId: any) {
    return this.http.put(BASE_URL+"api/updatereview/"+reviewId,true)
  }

  constructor(private http:HttpClient, private storageService:LocalStorageService) { }
  
  message="";
  adminLogin(username:string, password:string): any{
    return this.http.post<[]>(BASE_URL+"authenticate/admin",
    {username,password},
    {observe: 'response'})
    .pipe(
      tap(_ => this.log("Admin Authentication")),
        map((res: HttpResponse<any>) => {
          if(res.body.role==="ADMIN"){
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
          this.message = "Authentication failed";
          return null;
          
        }));
  }
  log(message: string): void {
    console.log(`User Auth Service: ${message}`)
  }
  isLoggedIn():boolean{
    if(localStorage.getItem("I_role")=="ADMIN"){
      return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERID);
    localStorage.removeItem(USERROLE);
  }
  getPendingReviews(){
    console.log("service called")
    return this.http.get(BASE_URL+"api/getpendingreviews");

  }
}
