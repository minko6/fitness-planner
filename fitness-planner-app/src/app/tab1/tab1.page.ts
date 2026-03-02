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
  groupedSessions: { [type: string]: any[] } = {};
  expandedType: string | null = null;
  totalMinutes: number = 0;

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

        this.totalMinutes = this.sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

        this.groupedSessions = {};
        this.sessions.forEach(s => {
          const type = s.workoutType || 'Ostalo';
          if (!this.groupedSessions[type]) this.groupedSessions[type] = [];
          this.groupedSessions[type].push(s);
        });

      } else {
        this.sessions = [];
        this.recentSessions = [];
        this.totalMinutes = 0;
        this.groupedSessions = {};
      }
    });
  }

  get typeKeys(): string[] {
    return Object.keys(this.groupedSessions);
  }

  toggleType(type: string) {
    this.expandedType = this.expandedType === type ? null : type;
  }

  formatDate(isoDate: string): string {
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
  }

  getTypeColor(type: string): string {                                                                                                           switch (type?.toLowerCase()) {
      case 'kardio': return 'primary';                                                                                                           case 'snaga': return 'tertiary';
      case 'fleksibilnost': return 'warning';
      default: return 'medium';
    }
  }
}