import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/user/profile/profile.component';

const routes: Routes = [
  {path : "login", component  : LoginComponent},
  {path : "signup", component : SignupComponent},
  {
    path : "/profile", 
    component : ProfileComponent, 
    loadChildren : ()=> import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path : "admin"
  },
  {path : "", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
