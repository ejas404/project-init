import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth/auth.service';
import { SnackbarService } from '../../core/service/shared/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../../core/utils/confirm-validator-helper';
import { take } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(
    private authService : AuthService,
    private snbarService : SnackbarService,
    private router : Router
  ){}

  signUpForm !: FormGroup;

  ngOnInit(){
    this.setSignUpform()
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

  onSignUp() { 
    this.authService.signUp(this.signUpForm.value)
    .pipe(take(1))
    .subscribe({
      next : (res)=>{
        if(res.success){
          this.snbarService.openSnackBar(res.msg)
          this.router.navigateByUrl('/')
        }
      },
      error : (err) =>{
       this.snbarService.openSnackBar(err.error.message)
      }
    
    })
  }
}
