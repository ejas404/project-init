import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../pages/user/profile/profile.component';
import { ChatComponent } from '../../pages/user/chat/chat.component';
import { UserDashboardComponent } from '../../pages/user/user-dashboard/user-dashboard.component';


export const routes = [
  {path : '', component : UserDashboardComponent},
  {path : 'chat', component : ChatComponent }
]


@NgModule({
  declarations: [
    ProfileComponent,
    ChatComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
