import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminnRoutingModule } from './adminn-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../services/admin.guard';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminReviewsComponent
  ],
  imports: [
    CommonModule,
    AdminnRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    AdminGuard
  ]
})
export class AdminnModule { }
