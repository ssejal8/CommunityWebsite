import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../services/auth.interceptor';
import { PostReviewComponent } from './post-review/post-review.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AskForReviewComponent } from './ask-for-review/ask-for-review.component';

@NgModule({
  declarations: [
    ProductComponent,
    ReviewsComponent,
    PostReviewComponent,
    AskForReviewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ],
  providers: [[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]]
})
export class ProductModule { }
