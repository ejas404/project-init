import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { ChatServiceService } from '../../../core/service/chat/chat-service.service';
import { Subject, connect, take, takeUntil } from 'rxjs';
import { SocketService } from '../../../core/service/socket/socket.service';
import { UserProfileService } from '../../../core/service/user/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  destroy$ = new Subject<void>()
  userList : UserDetailsTableModel [] = [];
  constructor(
    private authService: AuthService,
    private socketService : SocketService,
    private userService : UserProfileService
  ) { }

  ngOnInit() {
    this.fetchUserList()
    this.connectSocket()
  }

  connectSocket(){
    this.socketService.connectServer()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next  :res => {
        console.log(res)
      }
    })
  }

  fetchUserList() {
    this.userService.getUserList()
    .pipe(take(1))
    .subscribe({
      next : res => {
        console.log(res);
        this.userList = res
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  logout() {
    this.socketService.disconnect()
    this.authService.logout()
  }

  ngOnDestroy(){
    this.destroy$.next()
  }
}
