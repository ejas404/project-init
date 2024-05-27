import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/reusableComponents/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoutBtn } from '../../shared/buttons/logout.btn';
import { TableComponent } from '../../shared/reusableComponents/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ChatBoxComponent } from '../../shared/reusableComponents/chat-box/chat-box.component';
import { ChatUserListComponent } from '../../shared/reusableComponents/chat-user-list/chat-user-list.component';




@NgModule({
    declarations: [
        NavbarComponent,
        LogoutBtn,
        TableComponent,
        ChatBoxComponent,
        ChatUserListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatTableModule,
        FormsModule
    ],
    exports: [
        NavbarComponent,
        LogoutBtn,
        TableComponent,
        ChatBoxComponent,
        ChatUserListComponent
    ]
})
export class CustomModule { }
