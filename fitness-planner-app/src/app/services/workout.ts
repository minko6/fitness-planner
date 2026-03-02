import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';                                                                                
import { Auth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
  
export class WorkoutService {

  private dbUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private auth: Auth) {}

  private getUserId(): string {
    return this.auth.currentUser?.uid || '';
  }

  getWorkouts() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/workouts.json`);
  }

  addWorkout(workout: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/workouts.json`, workout);
  }

  updateWorkout(id: string, workout: any) {
    const uid = this.getUserId();
    return this.http.put(`${this.dbUrl}/users/${uid}/workouts/${id}.json`, workout);
  }

  deleteWorkout(id: string) {
    const uid = this.getUserId();
    return this.http.delete(`${this.dbUrl}/users/${uid}/workouts/${id}.json`);
  }

  saveProfile(profile: any) {
    const uid = this.getUserId();
    return this.http.put(`${this.dbUrl}/users/${uid}/profile.json`, profile);
  }

  getProfile() {                                                                                                            const uid = this.getUserId();
      return this.http.get(`${this.dbUrl}/users/${uid}/profile.json`);                                                      }

  addWeightEntry(entry: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/weightHistory.json`, entry);
  }

  getWeightHistory() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/weightHistory.json`);
  }
  
  addSession(session: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/sessions.json`, session);
  }

  getSessions() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/sessions.json`);
  }

  deleteSession(id: string) {
    const uid = this.getUserId();
    return this.http.delete(`${this.dbUrl}/users/${uid}/sessions/${id}.json`);
  }

  getWorkoutById(id: string) {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/workouts/${id}.json`);
  }
}
