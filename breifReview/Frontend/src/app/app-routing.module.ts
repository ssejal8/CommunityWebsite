import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate, mapToCanActivateChild } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
{path:'users',loadChildren:()=>import('./user/user.module')
.then(mod=>mod.UserModule)},
{path:'',component:HomeComponent},
{path:'product',loadChildren:()=>import('./product/product.module')
.then(mod=>mod.ProductModule)},
{path:'admin',loadChildren:()=>import('./adminn/adminn.module')
.then(mod=>mod.AdminnModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
