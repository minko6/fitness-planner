import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'app-workout-view',
  templateUrl: './workout-view.page.html',
  styleUrls: ['./workout-view.page.scss'],
  standalone: false
})
  
export class WorkoutViewPage implements OnInit {

  workout: any = null;
  duration: number = 0;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    const workoutId = this.route.snapshot.paramMap.get('workoutId') || '';
    this.duration = Number(this.route.snapshot.paramMap.get('duration'));

    this.workoutService.getWorkoutById(workoutId).subscribe((data: any) => {
      if (data) {
        this.workout = data;
      } else {
        this.notFound = true;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
