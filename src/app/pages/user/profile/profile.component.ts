import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { ChatServiceService } from '../../../core/service/chat/chat-service.service';
import { connect } from 'rxjs';
import { SocketService } from '../../../core/service/socket/socket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userList : UserDetailsTableModel [] = [];
  constructor(
    private authService: AuthService,
    private socketService : SocketService
  ) { }

  ngOnInit() {
    this.fetchUserList()
    this.connectChat()
  }

  connectChat(){
    this.socketService.connectServer().subscribe({
      next  :res => {
        console.log(res)
      }
    })
  }

  // waitResponse(){
  //   this.chatService.getMessage().subscribe({
  //     next : res => {
  //       console.log(res)
  //     }
  //   })
  // }

  fetchUserList() {

  }

  logout() {
    this.authService.logout()
  }
}
