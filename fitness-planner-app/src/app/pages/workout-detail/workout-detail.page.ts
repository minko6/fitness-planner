import { Component, OnInit } from '@angular/core';                                                                                                                                                                 
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../../services/workout';                                                                                                                                                         
  
@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: false
})
export class WorkoutDetailPage implements OnInit {

  workoutId: string = '';
  workout = {
    name: '',
    description: '',
    type: 'snaga'
  };
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.workoutId = this.route.snapshot.paramMap.get('id') || '';
    if (this.workoutId === 'new') {
      this.isNew = true;
    } else {
      this.loadWorkout();
    }
  }

  loadWorkout() {
    this.workoutService.getWorkouts().subscribe((data: any) => {
      if (data && data[this.workoutId]) {
        this.workout = data[this.workoutId];
      }
    });
  }

  save() {
    if (this.isNew) {
      this.workoutService.addWorkout(this.workout).subscribe(() => {
        this.router.navigate(['/tabs/tab2']);
      });
    } else {
      this.workoutService.updateWorkout(this.workoutId, this.workout).subscribe(() => {
        this.router.navigate(['/tabs/tab2']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/tabs/tab2']);
  }
}