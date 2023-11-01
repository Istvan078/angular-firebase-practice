import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './parts/home/home.component';
import { RegisterComponent } from './parts/register/register.component';
import { LoginComponent } from './parts/login/login.component';
import { UsersComponent } from './parts/users/users.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"users", component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
