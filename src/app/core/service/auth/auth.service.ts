import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginAuth, UserData } from '../../interfaces/auth.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signUp(formData : UserData) : Observable<any> {
    return this.http.post(`${environment.API_URL}/users/register`,formData)
  }

  login(formData : LoginAuth) : Observable<any> {
    return this.http.post(`${environment.API_URL}/users/login`,formData)
  }

}
