import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth';
import { WorkoutService } from './services/workout';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
  
export class AppComponent {

  profile: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private workoutService: WorkoutService
  ) {
    if (this.authService.isLoggedIn()) {
      this.authService.verifyToken().then(() => {
        this.workoutService.getProfile().subscribe((data: any) => {
          if (data) this.profile = data;
        });
      }).catch(() => {
        this.authService.logout();
        this.router.navigate(['/welcome']);
      });
    }
  }

  get userEmail() {
    return localStorage.getItem('email') || '';
  }

  get userInitials(): string {
    if (!this.profile?.name) return '?';
    const parts = this.profile.name.trim().split(' ');
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  async goToProgress() {
    await this.menu.close();
    this.router.navigate(['/progress']);
  }

  async logout() {
    await this.menu.close();
    await this.authService.logout();
    this.router.navigate(['/welcome']);
  }

}