import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
  
export class Tab1Page {

  sessions: any[] = [];
  recentSessions: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  ionViewWillEnter() {
    this.loadSessions();
  }

  loadSessions() {
    this.workoutService.getSessions().subscribe((data: any) => {
      if (data) {
        this.sessions = Object.entries(data)
          .map(([id, s]: [string, any]) => ({ id, ...s }))
          .sort((a, b) => b.id.localeCompare(a.id));
        this.recentSessions = this.sessions.slice(0, 3);
      } else {
        this.sessions = [];
        this.recentSessions = [];
      }
    });
  }

  formatDate(isoDate: string): string {
    const [y, m, d] = isoDate.split('-');
     return `${d}/${m}/${y}`;
  }
}