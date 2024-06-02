import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';
import { ChatBoxCommunicateService } from '../../../core/service/chat/chat-box-communicate.service';
import { decodeUserToken } from '../../../core/utils/jwt.helper';
import { ResponseMessage, SendMessageType } from '../../../core/interfaces/chat.interface';
import { ChatServiceService } from '../../../core/service/chat/chat-service.service';
import { UserProfileService } from '../../../core/service/user/user-profile.service';
import { generateImagePreview, isImageFile } from '../../../core/utils/file-check.helper';
import { SnackbarService } from '../../../core/service/shared/snackbar/snackbar.service';
import { Subject, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {

  destroy$ = new Subject<void>();

  text: string | null = null;
  isImgSelect: boolean = false;
  imagePreview !: ArrayBuffer;
  userData !: UserDetailsTableModel;
  oldChats: ResponseMessage[] = []
  @Input() receipient : UserDetailsTableModel |null = null;
  @ViewChild('messageContainer', { static: false }) messageContainer !: ElementRef;


  constructor(
    private chatCommunicate: ChatBoxCommunicateService,
    private chatService: ChatServiceService,
    private profileService: UserProfileService,
    private sanckBar: SnackbarService,
    private cd : ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.userData = decodeUserToken() as unknown as UserDetailsTableModel;
    this.receipient = null;
    this.getCurrentUser()
    this.waitResponse()
    this.getOldMessages()
  }

  getCurrentUser() {
    this.chatCommunicate.currentUser
    .subscribe({
      next: res => {
        this.receipient = res;
        this.getOldMessages()
      }
    })
  }

  getOldMessages() {
    if (this.receipient?._id == '' || !this.receipient?._id) return;
    this.profileService.getOldChats(this.receipient._id)
    .pipe(
      switchMap(res => {
        this.oldChats = res;
        this.scrollToBottom();
        this.cd.markForCheck()
        return of(); // This returns an empty observable
      })
    )
    .subscribe()
  }

  send() {
    if (!this.text || this.receipient?._id == '') return;
    const data: SendMessageType = {
      message: this.text,
      receiver: this.receipient?._id as string,
      sender: this.userData._id as string,
      contentType: "TEXT"
    }
    this.addChat()
    this.text = null;
    this.chatService.sendMessage(data)
  }

  addChat() {
    const newChat: ResponseMessage = {
      _id: (this.oldChats.length + 1).toString(),
      receiver: this.receipient?._id as string,
      sender: this.userData._id as string,
      message: this.text as string,
      createdAt: new Date().toISOString(),
      contentType: "TEXT"
    };
    this.oldChats.push(newChat);
    this.scrollToBottom()
  }

  trackById(ndex: number, chat: ResponseMessage) {
    return chat._id;
  }

  waitResponse() {
    this.chatService.getMessage()
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        alert(`new message ${res.message}`)
        this.oldChats.push(res)
        this.scrollToBottom()
      }
    })
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 200);
  }

  imageSelect() {
    this.isImgSelect = !this.isImgSelect;
  }

  onSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const file = input.files[0];

      // Checking the file type is it image
      if (isImageFile(file)) {

        //generates previewable image from the file
        generateImagePreview(file)
        .pipe(take(1))
        .subscribe({
          next: result => this.imagePreview = result as ArrayBuffer,
          error: error => {
            this.sanckBar.openSnackBar('Error generating image preview:')
            console.error('Error generating image preview:', error)
          }
        });
      } else {
        this.sanckBar.openSnackBar('Selected file is not an image.')
      }
    }
  }

  ngOnDestroy(){
    console.log('chat box closed')
  }

}
