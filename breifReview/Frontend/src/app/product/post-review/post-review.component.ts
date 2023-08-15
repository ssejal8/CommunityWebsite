import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent implements OnInit{
    
    added:boolean=false;
    seconds=0;
    redirectingIn=5;
    reviewform: FormGroup = new FormGroup({
    product_id: new FormControl('',Validators.required),
    user: new FormControl(''),
    review: new FormControl(''),
    rating: new FormControl(''),
  });
  constructor(private productService:ProductService, private formBuilder:FormBuilder,private route : ActivatedRoute, private router:Router){}
  
  productID:any;
  username = localStorage.getItem("I_name");
  submitted :boolean = false
  ngOnInit(): void {
    
    this.productID = this.route.snapshot.paramMap.get('product_id');
    
    this.reviewform = this.formBuilder.group({
        product_id:[this.productID],
        user: [this.username],
        review: ['',
        [
          Validators.required,
          Validators.minLength(40),
          Validators.maxLength(200)
        ]
        ],
        rating:['',Validators.required],
    });
    this.getProductId()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.reviewform.controls;
  }
  onSubmit(){
    console.warn(this.reviewform.value);
    this.submitted = true;
    if (this.reviewform.invalid) {
      return;
    }
    console.log(JSON.stringify(this.reviewform.value, null, 2));
    
    this.postReview(this.reviewform.value);
    this.reviewAdded()
  }

  postReview(review:any){
    this.productService.postReview(review).subscribe((res)=>{
      this.added=true;
      console.log(review);
    })
  }

  getProductId(){
    this.productID = this.route.snapshot.paramMap.get('product_id');
    console.log(this.productID)
  }
  reloadSeconds=5;
  reviewAdded(){
    this.reviewform.reset;
    this.added=true;
    this.startCountDown();
    //this.router.navigate(['product/products'])
  }
  startCountDown(){
    const interval= setInterval(()=>{
      this.seconds++;  
      this.redirectingIn--;
    },1000);
    setTimeout(()=>{
      clearInterval(interval);
      this.router.navigate(['/product/products']);
    },3000);
}
}
