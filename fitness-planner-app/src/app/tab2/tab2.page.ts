import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';                                                                                         
import { WorkoutService } from '../services/workout';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
  
export class Tab2Page implements OnInit {

  workouts: any[] = [];

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  ionViewWillEnter() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workoutService.getWorkouts().subscribe((data: any) => {
      if (data) {
        this.workouts = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      } else {
        this.workouts = [];
      }
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/workout-detail', id]);
  }

  addWorkout() {
    this.router.navigate(['/workout-detail', 'new']);
  }

  deleteWorkout(id: string) {
    this.workoutService.deleteWorkout(id).subscribe(() => {
      this.loadWorkouts();
    });
  }
}