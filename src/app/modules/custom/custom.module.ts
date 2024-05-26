import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/reusableComponents/navbar/navbar.component';


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports : [
        NavbarComponent
    ]
})
export class CustomModule { }