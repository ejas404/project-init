import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AuthService } from '../../core/service/auth/auth.service';
import { SnackbarService } from '../../core/service/shared/snackbar/snackbar.service';
import { LoginAuth } from '../../core/interfaces/auth.interface';
import { removeToken, setToken } from '../../core/utils/jwt.helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private snbarService: SnackbarService,
    private router : Router
  ) { }

  loginForm !: FormGroup;

  ngOnInit() {
      this.setLoginForm()
  }

  setLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        setToken(res.token as string)
        this.snbarService.openSnackBar('login successfully...')
        if(res.role =="Admin"){
          this.router.navigateByUrl('/admin')
        }else{
          this.router.navigateByUrl('/profile')
        } 
      },
      error: (err) => {
        removeToken()
        this.snbarService.openSnackBar(err.error.message)
      }

    })
  }

  ngOnDestroy(){

  }
}
