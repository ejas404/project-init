import { Component, Input } from '@angular/core';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { ChatBoxCommunicateService } from '../../../core/service/chat/chat-box-communicate.service';

@Component({
  selector: 'chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrl: './chat-user-list.component.scss'
})
export class ChatUserListComponent {
  @Input() chatList: UserDetailsTableModel[] = [];

  constructor(
    private chatCommunicate: ChatBoxCommunicateService
  ) { }

  changeUser(id: string | undefined) {
    if (!id) return;
    const userData = this.chatList.find(each => each._id === id);
    this.chatCommunicate.setChatUser(userData as UserDetailsTableModel)
  }
}
