import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../core/utils/confirmPasswordValidator';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {

  constructor(private authService : AuthService){}

  @Input() formtype !: string;
  signUpForm !: FormGroup;
  loginForm !: FormGroup;

  ngOnInit() {
    if (this.formtype === 'login') {
      this.setLoginForm()
    } else {
      this.setSignUpform()
    }
  }

  setLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  setSignUpform() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.pattern('^[A-Za-z]{3,10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,  Validators.pattern('^(?=.*[a-z])(?=.*\\d)[a-z\\d]{8}$')]),
      confirmPassword: new FormControl('', Validators.required)
    },
      {
        validators: confirmPasswordValidator
      }
    )
  }

  onLogin() { }

  onSignUp() { 
    this.authService.signUp(this.signUpForm.value).subscribe({
      next : (res)=>{
        console.log(res)
      },
      error : (err) =>{
        console.log
      }
    
    })
  }

}
