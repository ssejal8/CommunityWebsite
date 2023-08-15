import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ask-for-review',
  templateUrl: './ask-for-review.component.html',
  styleUrls: ['./ask-for-review.component.scss']
})
export class AskForReviewComponent {
    added:boolean=false;
    addform: FormGroup = new FormGroup({
    productCode: new FormControl(''),
    productName: new FormControl(''),
    brandName: new FormControl(''),
    productImg: new FormControl(''),
    productDescription: new FormControl(''),
  });
  product_id:any;
  submitted:boolean = false;
  constructor(private fb:FormBuilder, private productService:ProductService, private router:Router){}
  ngOnInit(): void {
    
    this.addform = this.fb.group(
      {
        productCode:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Z\d]+$/)]],
        productName: ['', [Validators.required]],
        brandName: ['', [Validators.required]],
        productDescription: [
          '',
          [
            Validators.required,
            Validators.minLength(20),
            Validators.maxLength(200)
          ]
        ],
        productImg: ['', [Validators.required ,Validators.pattern(/(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/)]],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addform.controls;
  }
  
  reloadSeconds =0;
  redirectingIn = 5;
  seconds=0;
  product:any;
  alreadyExists:boolean = false;
  onSubmit(){
    console.warn(this.addform.value);
    this.product = this.addform.value;
    this.submitted = true;
    if (this.addform.invalid) {
      return;
    }
    console.log(JSON.stringify(this.addform.value, null, 2));
    this.productService.getProduct(this.addform.value.productCode).subscribe(
      (res:any)=>{
      if(res==null){
        this.productService.saveProduct(this.product).subscribe(
          (res)=>{
            
          this.added=true;
          //this.startCountDown();
        });
      }
      else{
        console.log(res);
        this.product_id = res.productId;
        this.startCountDown();
        this.alreadyExists = true;
        //window.alert("Product already exists");
      }
    },
    (error)=>{
      this.productService.saveProduct(this.product).subscribe(res=>{
        //window.location.href="/product/products"
        this.added=true;
        
      });
    })
}

 
  startCountDown(){
      const interval= setInterval(()=>{
        this.seconds++;  
        this.redirectingIn--;
      },1000);
      setTimeout(()=>{
        clearInterval(interval);
        this.router.navigate(['/product/reviews/'+this.product_id]);
      },5000);
  }
}
