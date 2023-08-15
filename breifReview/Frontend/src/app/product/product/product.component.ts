import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy } from '@angular/common';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterForm: any;
  sortForm: any;
  searchBar: any;
  products: any;
  listTobeFiltered: any;
  productId: any;
  key: any;
  isEmpty: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private productService: ProductService, private router: Router, private fb: FormBuilder, private modalServices: NgbModal, private locationStrategy: LocationStrategy) { }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      productName: '',
      productBrand: '',
      selection: new FormControl('name')
    })
    this.sortForm = this.fb.group({
      selection: new FormControl('name')
    })
    this.searchBar = this.fb.group({
      search: ['', Validators.required]
    })

    this.products = this.getAllproducts();

    console.log(this.key);
  }

  get checked() {
    return this.filterForm.get('selection');
  }
  get check() {
    return this.sortForm.get('selection');
  }

  search() {
    if (this.searchBar.invalid) {
      return;
    }
    this.key = this.searchBar.value['search'].split(' ');
    this.productService.searchProducts(this.key).subscribe((res) => {
      this.products = res;
      this.listTobeFiltered = this.products;
      if (this.products.length == 0) {
        this.isEmpty = true;
      }
      else if(this.products.length != 0){
        this.isEmpty = false;
      }
    });

  }
  scrollToTop() {
    this.document.documentElement.scrollTop = 0;
  }

  openModal(content: any) {
    this.modalServices.open(content);
  }

  getAllproducts() {
    const search = this.document.getElementById("query") as HTMLInputElement;
    search.value = "";
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
    });
  }

  reset() {
    this.isEmpty = false;
    if(this.listTobeFiltered!=null && this.listTobeFiltered.length!=0){
      this.products = this.listTobeFiltered;
    }
    else{
      this.getAllproducts();
    }
  }

  saveProductID(product_id: any) {
    this.productService.saveProductID(product_id),
      this.productId = product_id;
  }

  viewReviews(product_id: any) {
    this.productService.getProduct(product_id);
    console.log(product_id);
  }

  askForReview() {
    this.router.navigate(['/product/ask-for-review']);
  }
  filterProducts() {
    let check = this.checked?.value;
    let product = this.filterForm.value;
    this.sortForm.reset;
    console.log(check);
    if (this.key != null) {
      if (this.key.search !== "") {
        console.log("****");
        console.log(this.listTobeFiltered);
        if (check === 'name') {
          const filteredResults = this.listTobeFiltered.filter((products: any) => {
            const nameMatch = product.productName ? products.productName.toLowerCase().includes(product.productName.toLowerCase()) : true;
            return nameMatch;
          });
          this.products = filteredResults;
          if (this.products.length == 0) {
            this.isEmpty = true;
          }
        }
        else if (check === 'brand') {
          console.log(this.listTobeFiltered);
          const filteredResults = this.listTobeFiltered.filter((products: any) => {
            const brandMatch = product.productBrand ? products.brandName.toLowerCase().includes(product.productBrand.toLowerCase()) : true;
            return brandMatch;
          });
          this.products = filteredResults;
          if (this.products.length == 0) {
            this.isEmpty = true;
          }
        }
      }

    }
    else {
      if (check === 'name') {
        this.productService.getProductByName(product.productName).subscribe((data) => {
          this.products = data;
          console.log(this.products)
          if (this.products.length == 0) {
            this.isEmpty = true;
          }
        })
      }
      else if (check === 'brand') {
        this.productService.getProductByBrand(product.productBrand).subscribe((data) => {
          this.products = data;
          if (this.products == null) {
            this.isEmpty = true;
          }
        })
      }
      else if (check === 'code') {
        this.productService.getProductByCode(product.productCode).subscribe((data) => {
          this.products = data;
          if (this.products == null) {
            this.isEmpty = true;
          }
        })
      }
      else {
        this.modalServices.dismissAll();
      }
    }
  }

  sortProducts() {
    let check = this.check?.value;
    console.log(check);
    if (check === 'name') {
      this.products = this.products.sort((a: { productName: string; }, b: { productName: string; }) => {
        if (a.productName < b.productName)
          return -1;
        if (a.productName > b.productName)
          return 1;
        return 0;
      });
    }
    else if (check === 'brand') {
      this.products = this.products.sort((a: { brandName: string; }, b: { brandName: string; }) => {
        if (a.brandName < b.brandName)
          return -1;
        if (a.brandName > b.brandName)
          return 1;
        return 0;
      });
    }
    else if (check === 'code') {
      this.products = this.products.sort((a: { productCode: string; }, b: { productCode: string; }) => {
        if (a.productCode < b.productCode)
          return -1;
        if (a.productCode > b.productCode)
          return 1;
        return 0;
      });
    }
    else {
      this.modalServices.dismissAll();
    }
  }
}
