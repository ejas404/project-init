import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../pages/login/login.component';
import { SignupComponent } from '../../pages/signup/signup.component';
import { AuthService } from '../../core/service/auth/auth.service';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports : [
        LoginComponent,
        SignupComponent
    ],
    providers : [AuthService]
})
export class AuthenticationModule { }
