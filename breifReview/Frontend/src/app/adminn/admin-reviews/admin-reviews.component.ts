import { LocationStrategy } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent {
  constructor(private adminService:AdminService,private productService:ProductService,private locationStrategy:LocationStrategy){}
  noReviews:boolean=false;
  reviews:any
  productIds : Array<any>=[];
  products : Array<any>=[];

  @ViewChildren('reviewItem') reviewItems!: QueryList<any>;
  ngOnInit(): void {
    this.getPendingReviews();
    this.getAllProducts();
  }
  
  product:any;
  getProductDetails(productId:string){
    this.product = this.products.find(p => p.productId === productId);
    return this.product;
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data:any)=>{
      this.products = data;
    });
  }
  getPendingReviews(){
    this.adminService.getPendingReviews().subscribe((res)=>{
      this.reviews = res;
      // for(let k=0;k<this.reviews.length;k++){
      //   console.log(this.reviews.productId);
      //   this.productIds.push(this.reviews.product_id);
      // }
      
      if(this.reviews.length==0){
        this.noReviews=true;
      }
      // for(let i =0;i<this.productIds.length;i++){
      //   console.log(this.productIds[i]);
        // this.produtService.getProductById(this.productIds[i]).subscribe((res)=>{
        //   this.products.push(res);
        //   console.log("**********" +this.products)
        // })
      // }
    })
  }
  
  approveReview(reviewId:number){
    this.adminService.approveReview(reviewId).subscribe(res=>{
      this.getPendingReviews();
    });
    
  }
  rejectReview(reviewId:number){
    this.adminService.rejectReview(reviewId).subscribe(res=>{
      this.getPendingReviews();
    });
    
  }
}
