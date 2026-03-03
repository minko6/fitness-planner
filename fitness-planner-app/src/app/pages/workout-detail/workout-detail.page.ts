import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../../services/workout';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: false
})
  
export class WorkoutDetailPage implements OnInit {

  workoutId: string = '';
  workout: any = {
    name: '',
    description: '',
    type: 'snaga',
    exercises: []
  };
  isNew: boolean = false;
  expandedIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService,
    private navCtrl: NavController
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
        if (!this.workout.exercises) {
          this.workout.exercises = [];
        }
      }
    });
  }

  toggleExercise(i: number) {
    this.expandedIndex = this.expandedIndex === i ? null : i;
  }

  addExercise() {
    this.workout.exercises.push({ name: '', sets: null, reps: null, weight: null });
    this.expandedIndex = this.workout.exercises.length - 1;
  }

  removeExercise(index: number) {
    this.workout.exercises.splice(index, 1);
    this.expandedIndex = null;
  }

  save() {
    if (this.isNew) {
      this.workoutService.addWorkout(this.workout).subscribe(() => {
        this.navCtrl.back();
      });
    } else {
      this.workoutService.updateWorkout(this.workoutId, this.workout).subscribe(() => {
        this.navCtrl.back();
      });
    }
  }

  cancel() {
    this.navCtrl.back();
  }
}