import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutViewPageRoutingModule } from './workout-view-routing.module';

import { WorkoutViewPage } from './workout-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutViewPageRoutingModule
  ],
  declarations: [WorkoutViewPage]
})
export class WorkoutViewPageModule {}
