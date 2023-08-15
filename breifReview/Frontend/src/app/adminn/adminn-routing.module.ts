import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { AdminGuard } from '../services/admin.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

const routes: Routes = [
  {path:'login',component:AdminLoginComponent},
  {path:'reviews',component:AdminReviewsComponent,canActivate:[AdminGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminnRoutingModule { }
