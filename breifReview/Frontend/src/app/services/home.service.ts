import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL ="http://localhost:8082/";

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  
  constructor(private http:HttpClient) { }
  
  getUserStats(){
    return this.http.get(BASE_URL+"getusercount");
  }
  getProductStats(){
    return this.http.get(BASE_URL+"getproductcount");
  }
  getReviewStats(){
    return this.http.get(BASE_URL+"getreviewcount");
  }
}
