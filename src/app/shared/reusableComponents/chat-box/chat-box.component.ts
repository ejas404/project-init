import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { ChatBoxCommunicateService } from '../../../core/service/chat/chat-box-communicate.service';
import { decodeUserToken } from '../../../core/utils/jwt.helper';
import { ResponseMessage, SendMessageType } from '../../../core/interfaces/chat.interface';
import { ChatServiceService } from '../../../core/service/chat/chat-service.service';
import { UserProfileService } from '../../../core/service/user/user-profile.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {

  @Input() receipient !: UserDetailsTableModel;
  userData !: UserDetailsTableModel;
  oldChats : ResponseMessage [] = []
  text : string | null = null;
  @ViewChild('messageContainer',{static : false})messageContainer !: ElementRef;


  constructor(
    private chatCommunicate: ChatBoxCommunicateService,
    private chatService: ChatServiceService,
    private profileService : UserProfileService
  ) { }

  ngOnInit() {
    this.userData = decodeUserToken() as unknown as UserDetailsTableModel;
    this.getCurrentUser()
    this.waitResponse()
    this.getOldMessages()
  }

  getCurrentUser() {
    this.chatCommunicate.currentUser.subscribe({
      next: res => {
        this.receipient = res;
        this.getOldMessages()
      }
    })
  }

  getOldMessages(){
    if (this.receipient._id == '' || !this.receipient._id) return;
    this.profileService.getOldChats(this.receipient._id).subscribe({
      next : res => {
        this.oldChats = res;
        this.scrollToBottom()
      }
    })
  }

  send() {
    if (!this.text || this.receipient._id == '') return;
    const data: SendMessageType = {
      message: this.text,
      receiver: this.receipient._id as string,
      sender: this.userData._id as string,
      contentType: "TEXT"
    }
    this.addChat()
    this.text = null;
    this.chatService.sendMessage(data)
  }

  addChat() {
    const newChat : ResponseMessage = {
      _id: (this.oldChats.length + 1).toString(),
      receiver: this.receipient._id as string,
      sender : this.userData._id as string,
      message: this.text as string,
      createdAt: new Date().toISOString(),
      contentType: "TEXT"
    };
    this.oldChats.push(newChat);
    this.scrollToBottom()
  }

  trackById(ndex: number, chat: ResponseMessage){
    return chat._id;
  }

  waitResponse() {
    this.chatService.getMessage().subscribe({
      next: (res) => {
        this.oldChats.push(res)
        this.scrollToBottom()
      }
    })
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight ;
    }, 200);   
  }

}
