import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL ="http://localhost:8082/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  productID : any;
  getAllProducts(){
    return this.http.get(BASE_URL+"api/getallproducts");
  }
  getProduct(product_code:string){
    return this.http.get(BASE_URL+"api/getproduct/"+product_code);
  }
  getProductById(product_id:string){
     return this.http.get(BASE_URL+"api/getproductbyid/"+product_id);
  }
  postReview(review:any):Observable<any>{
    console.log(review);
    return this.http.post<[]>(BASE_URL+"api/addreview",review); 
  }
  saveProductID(product_id:any){
    this.productID=product_id;
    return this.productID
  }
  getProductId(){
    return this.productID
  }
  getProductByBrand(brand:any){
    return this.http.get(BASE_URL+"api/getallproductsbybrand/"+brand);
  }
  getProductByCode(code:any){
    return this.http.get(BASE_URL+"api/getallproductsbycode/"+code);
  }
  getProductByName(name:any){
    return this.http.get(BASE_URL+"api/getallproductsbyname/"+name);
  }
  getReviews(product_id:string){
    return this.http.get(BASE_URL+"api/getreviews/"+product_id);
  }
  getProductReviewsCount(product_id:string){
    return this.http.get(BASE_URL+"api/getproductreviewscount/"+product_id);
  }
  getAverageRating(product_id:string){
    return this.http.get(BASE_URL+"api/getaveragerating/"+product_id);
  }
  saveProduct(product:any){
    return this.http.post<[]>(BASE_URL+"api/addproduct",product);
  }
  searchProducts(keywords:string[]){
    let params = new HttpParams();
    keywords.forEach((keyword, index) => {
      params = params.append('keywords', keyword);
    });
    return this.http.get(BASE_URL+"api/search/"+keywords);
  }

 
  }


