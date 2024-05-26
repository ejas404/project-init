import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { AdminDashboardService } from '../../../core/service/admin/admin.dash.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  constructor(
    private authService: AuthService,
    private adminDash : AdminDashboardService
  ) { }

  ngOnInit() {
    this.fetchUserList()
  }

  fetchUserList() {
    this.adminDash.getUserList().subscribe({
      next : res => {
        console.log(res)
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
