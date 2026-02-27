import { Component, OnInit } from '@angular/core';                                                                                import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';                                                                              
  
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
  
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Register error:', error);
      alert('Greška pri registraciji!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}