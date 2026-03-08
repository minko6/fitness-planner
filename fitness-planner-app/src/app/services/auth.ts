import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  
import { Injectable } from '@angular/core';

@Injectable({                                                                                                                       
  providedIn: 'root'
})
  
export class AuthService {

   constructor(private http: HttpClient) {}

  register(email: string, password: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, {
        email, password, returnSecureToken: true
      }).pipe(tap((res: any) => {
        localStorage.setItem('uid', res.localId);
        localStorage.setItem('idToken', res.idToken);
        localStorage.setItem('email', res.email);
      }))
    );
  }

  login(email: string, password: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, {
        email, password, returnSecureToken: true
      }).pipe(tap((res: any) => {
        localStorage.setItem('uid', res.localId);
        localStorage.setItem('idToken', res.idToken);
        localStorage.setItem('email', res.email);
      }))
    );
  }

  logout(): void {
    localStorage.removeItem('uid');
    localStorage.removeItem('idToken');
    localStorage.removeItem('email');
  }

  getCurrentUserId(): string {
    return localStorage.getItem('uid') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('idToken');
  }
  
  verifyToken(): Promise<any> {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) return Promise.reject('no token');
    return firstValueFrom(
      this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebase.apiKey}`, { idToken })
    );
  }

}
