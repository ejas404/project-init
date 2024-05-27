import { Component } from '@angular/core';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { UserProfileService } from '../../../core/service/user/user-profile.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  userList : UserDetailsTableModel [] = [];
  constructor(
    private userService : UserProfileService
  ) { }

  ngOnInit() {
    this.fetchUserList()
  }


  fetchUserList() {
    this.userService.getUserList()
    .pipe(take(1))
    .subscribe({
      next : res => {
        this.userList = res
      },
      error : err =>{
        console.log(err)
      }
    })
  }

}
