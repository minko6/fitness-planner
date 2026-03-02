import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
  
export class Tab3Page {

  sessions: any[] = [];

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
      } else {
        this.sessions = [];
      }
    });
  }

  deleteSession(id: string) {
    this.workoutService.deleteSession(id).subscribe(() => {
      this.loadSessions();
    });
  }

  formatDate(isoDate: string): string {
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
  }
}
