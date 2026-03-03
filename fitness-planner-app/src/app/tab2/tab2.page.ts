import { Component, OnInit } from '@angular/core';                                                                                    
import { WorkoutService } from '../services/workout';
import { AlertController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
  
export class Tab2Page implements OnInit {

  workouts: any[] = [];

  constructor(private workoutService: WorkoutService, private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadWorkouts();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.includes('tab2')) {
        this.loadWorkouts();
      }
    });
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

  deleteWorkout(id: string, event: Event) {
    event.stopPropagation();
    this.workoutService.deleteWorkout(id).subscribe(() => {
      this.loadWorkouts();
    });
  }

  async startSession(workout: any, event: Event) {
    event.stopPropagation();
    const alert = await this.alertCtrl.create({
      header: 'Pokreni trening',
      subHeader: workout.name,
      inputs: [
        {
          name: 'duration',
          type: 'number',
          placeholder: 'Trajanje u minutima'
        }
      ],
      buttons: [
        { text: 'Otkaži', role: 'cancel' },
        {
          text: 'Sačuvaj',
          handler: (data: any) => {
            if (!data.duration) return false;
            const session = {
              workoutId: workout.id,
              workoutName: workout.name,
              workoutType: workout.type,
              date: new Date().toISOString().split('T')[0],
              duration: Number(data.duration)
            };
            this.workoutService.addSession(session).subscribe();
              return true;
          }
        }
      ]
    });
    await alert.present();
  }
}