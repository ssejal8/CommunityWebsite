import { Injectable } from '@angular/core';

const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role"
const USERNAME ="I_name"

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  saveUserId(userId: any) {
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID, userId);
  }
  saveUserRole(role: any) {
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE, role);
  }
  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  saveUserName(name:any){
    window.localStorage.removeItem(USERNAME);
    window.localStorage.setItem(USERNAME, name);
  }
  static getToken(): string | null{
      return localStorage.getItem(TOKEN) 
  }
  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }
  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "USER"
  }
  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.role;
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(USERID) as string)
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN"
  }
  static signOut(){
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERID);
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(USERROLE);
    window.location.replace("");
    window.location.href = "";
  }
}
