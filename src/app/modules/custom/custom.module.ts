import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../shared/reusableComponents/auth-form/auth-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/reusableComponents/navbar/navbar.component';


@NgModule({
    declarations: [
        AuthFormComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports : [
        AuthFormComponent,
        NavbarComponent
    ]
})
export class CustomModule { }
