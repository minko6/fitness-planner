import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutViewPage } from './workout-view.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutViewPageRoutingModule {}
