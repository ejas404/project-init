import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { UserProfileService } from '../../../core/service/user/user-profile.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ChatComponent {

  userList : UserDetailsTableModel [] = [];
  destroy$ !: Subscription;
  constructor(
    private userService : UserProfileService,
    private cd : ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchUserList()
  }


  fetchUserList() {
    this.destroy$ = this.userService.getUserList()
    .subscribe({
      next : res => {
        this.userList = res
        this.cd.markForCheck()
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  ngOnDestroy(){
    this.destroy$.unsubscribe()
  }

}
