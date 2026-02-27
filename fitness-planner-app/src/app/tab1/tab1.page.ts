import { Component, OnInit } from '@angular/core';                                                                                
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';                                                                                 
  
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
  
export class Tab1Page implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

}