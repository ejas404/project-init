import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserDetailsTableModel } from '../../../core/interfaces/table.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userList : UserDetailsTableModel [] = [];
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchUserList()
  }

  fetchUserList() {

  }

  logout() {
    this.authService.logout()
  }
}
