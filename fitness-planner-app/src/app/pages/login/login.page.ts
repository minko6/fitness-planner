import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Login error:', error);
      alert('Pogrešan email ili lozinka!');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
