import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutViewPage } from './workout-view.page';

describe('WorkoutViewPage', () => {
  let component: WorkoutViewPage;
  let fixture: ComponentFixture<WorkoutViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
