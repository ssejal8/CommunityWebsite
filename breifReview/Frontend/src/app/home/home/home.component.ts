import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  constructor(private router:Router,private homeService:HomeService, private locationStrategy:LocationStrategy){}
  ngOnInit(): void {
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', window.location.href);
    });
    this.disableBackButtonHistory();
    this.getUserStats();
    this.getProductStats();
    this.getReviewStats();
}


  users:any=0;
  products:any=0;
  reviews:any=0;
  getUserStats(){ 
    this.homeService.getUserStats().subscribe(result=>{
      this.users = result
    })
    
  }
  disableBackButtonHistory() {
    history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
    };
  }
  getProductStats(){
    this.homeService.getProductStats().subscribe(result=>{
      this.products = result;
    })
  }
  getReviewStats(){
    this.homeService.getReviewStats().subscribe(result=>{
      this.reviews = result;
    })
  }
  goToRegisterPage(){
    this.router.navigateByUrl("/users/signUp");
  }
}
