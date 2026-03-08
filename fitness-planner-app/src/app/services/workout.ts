import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';                                                                                
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
  
export class WorkoutService {

  private dbUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {}

  private getUserId(): string {
    return localStorage.getItem('uid') || '';
  }

  private getToken(): string {  
    return localStorage.getItem('idToken') || '';
  }

  getWorkouts() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/workouts.json?auth=${this.getToken()}`);
  }

  addWorkout(workout: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/workouts.json?auth=${this.getToken()}`, workout);
  }

  updateWorkout(id: string, workout: any) {
    const uid = this.getUserId();
    return this.http.put(`${this.dbUrl}/users/${uid}/workouts/${id}.json?auth=${this.getToken()}`, workout);
  }

  deleteWorkout(id: string) {
    const uid = this.getUserId();
    return this.http.delete(`${this.dbUrl}/users/${uid}/workouts/${id}.json?auth=${this.getToken()}`);
  }

  saveProfile(profile: any) {
    const uid = this.getUserId();
    return this.http.put(`${this.dbUrl}/users/${uid}/profile.json?auth=${this.getToken()}`, profile);
  }

  getProfile() {                                                                                                            const uid = this.getUserId();
      return this.http.get(`${this.dbUrl}/users/${uid}/profile.json?auth=${this.getToken()}`);                                                      }

  addWeightEntry(entry: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/weightHistory.json?auth=${this.getToken()}`, entry);
  }

  getWeightHistory() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/weightHistory.json?auth=${this.getToken()}`);
  }
  
  addSession(session: any) {
    const uid = this.getUserId();
    return this.http.post(`${this.dbUrl}/users/${uid}/sessions.json?auth=${this.getToken()}`, session);
  }

  getSessions() {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/sessions.json?auth=${this.getToken()}`);
  }

  deleteSession(id: string) {
    const uid = this.getUserId();
    return this.http.delete(`${this.dbUrl}/users/${uid}/sessions/${id}.json?auth=${this.getToken()}`);
  }

  getWorkoutById(id: string) {
    const uid = this.getUserId();
    return this.http.get(`${this.dbUrl}/users/${uid}/workouts/${id}.json?auth=${this.getToken()}`);
  }
}
