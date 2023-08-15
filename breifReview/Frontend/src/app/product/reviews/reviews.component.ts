import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit{
  constructor(private productService:ProductService,private router:Router,private route:ActivatedRoute){}
  product_id:any;
  product:any;
  reviews:any;
  stars:any;
  hasReviews:boolean=false;
  noOfReviews:number=0;
  averageRating:number=0;
  ngOnInit(): void {
    this.product_id = this.route.snapshot.paramMap.get('product_id');
    this.productService.getProductById(this.product_id).subscribe(res=>{
      this.product=res;
      console.log(this.product);
    });
    this.productService.getReviews(this.product_id).subscribe(res=>{
      this.reviews = res;
      this.stars = this.reviews.rating;
      console.log(this.reviews);
    })
    this.productService.getProductReviewsCount(this.product_id).subscribe((res:any)=>{
      this.noOfReviews = res;
      if(this.noOfReviews!=0){
        this.hasReviews = true;
      }
    })
    this.productService.getAverageRating(this.product_id).subscribe((res:any)=>{
      if(res===null){
        this.averageRating =0;
        //console.log(res);
      }
      else{
        this.averageRating = res;
      }
    })

  }

}
