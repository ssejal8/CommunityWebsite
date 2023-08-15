import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from '../services/auth.guard';
import { ReviewsComponent } from './reviews/reviews.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { AskForReviewComponent } from './ask-for-review/ask-for-review.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';


const routes: Routes = [
  {path:'products',component:ProductComponent, canActivate:[AuthGuard]},
  {path:'reviews/:product_id',component: ReviewsComponent, canActivate:[AuthGuard]},
  {path:'post-review/:product_id',component: PostReviewComponent, canActivate:[AuthGuard]},
  {path:'ask-for-review',component: AskForReviewComponent, canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
