import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginAuth, SignUpAuth, UserData } from '../../interfaces/auth.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  signUp(formData : SignUpAuth) : Observable<{msg : string, success : boolean}> {
    return this.http.post<{msg : string, success : boolean}>(`${environment.API_URL}/users/register`,formData)
  }

  login(formData : LoginAuth) : Observable<UserData> {
    return this.http.post<UserData>(`${environment.API_URL}/users/login`,formData)
  }

}
