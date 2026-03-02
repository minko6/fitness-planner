import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
  
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  height: number | null = null;
  weight: number | null = null;

  constructor(
    private authService: AuthService,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  ngOnInit() {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.workoutService.saveProfile({
        name: this.name,
        height: this.height,
        weight: this.weight
      }).subscribe(() => {
        this.router.navigate(['/tabs']);
      });
    } catch (error) {
      console.error('Register error:', error);
      alert('Greška pri registraciji!');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}