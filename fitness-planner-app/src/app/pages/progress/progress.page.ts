import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false
})
  
export class ProgressPage implements OnInit {

  profile: any = { name: '', height: null, weight: null };
  weightHistory: { id: string; date: string; weight: number }[] = [];
  editMode = false;
  newWeight: number | null = null;
  originalWeight: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadProfile();
    this.loadWeightHistory();
  }

  loadProfile() {
    this.workoutService.getProfile().subscribe((data: any) => {
      if (data) this.profile = data;
    });
  }

  loadWeightHistory() {
    this.workoutService.getWeightHistory().subscribe((data: any) => {
      if (data) {
        this.weightHistory = Object.entries(data)
          .map(([id, entry]: [string, any]) => ({ id, ...entry }))
          .sort((a, b) => b.id.localeCompare(a.id));
      } else {
        this.weightHistory = [];
      }
    });
  }

  enterEditMode() {
    this.originalWeight = this.profile.weight;
    this.editMode = true;
  }

  get bmi(): number | null {
    if (!this.profile?.height || !this.profile?.weight) return null;
    const heightM = this.profile.height / 100;
    return parseFloat((this.profile.weight / (heightM * heightM)).toFixed(1));
  }

  get bmiCategory(): string {
    if (this.bmi === null) return '';
    if (this.bmi < 18.5) return 'Ispod normale — premršav/a';
    if (this.bmi < 25) return 'Normalna težina';
    if (this.bmi < 30) return 'Iznad normale — prekomerna težina';
    return 'Gojaznost';
  }

  get bmiColor(): string {
    if (this.bmi === null) return '';
    if (this.bmi < 18.5) return 'warning';
    if (this.bmi < 25) return 'success';
    if (this.bmi < 30) return 'warning';
    return 'danger';
  }

  saveProfile() {
    const weightChanged = this.originalWeight !== null &&
      Number(this.profile.weight) !== Number(this.originalWeight);

    this.workoutService.saveProfile(this.profile).subscribe(() => {
      if (weightChanged) {
        const entry = {
          date: new Date().toISOString().split('T')[0],
          weight: Number(this.profile.weight)
        };
        this.workoutService.addWeightEntry(entry).subscribe(() => {
          this.loadWeightHistory();
        });
      }
      this.editMode = false;
    });
  }

  addWeightEntry() {
    if (!this.newWeight) return;
    const entry = {
      date: new Date().toISOString().split('T')[0],
      weight: this.newWeight
    };
    this.workoutService.addWeightEntry(entry).subscribe(() => {
      this.profile.weight = this.newWeight;
      this.workoutService.saveProfile(this.profile).subscribe();
      this.newWeight = null;
      this.loadWeightHistory();
    });
  }

  // Lista je sortirana od najnovijeg prema najstarijem (index 0 = najnoviji)
  // Poredimo trenutni sa prethodnim (starijim) mjerenjem koje je na index+1
  getWeightColor(index: number): string {
    if (index === this.weightHistory.length - 1) return 'medium';
    const current = this.weightHistory[index].weight;
    const previous = this.weightHistory[index + 1].weight;
    if (current > previous) return 'danger';
    if (current < previous) return 'success';
    return 'medium';
  }

  formatDate(isoDate: string): string {
    const [y, m, d] = isoDate.split('-');
    return `${d}/${m}/${y}`;
  }
    
}