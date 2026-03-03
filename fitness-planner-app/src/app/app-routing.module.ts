import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'workout-detail/:id',
    loadChildren: () => import('./pages/workout-detail/workout-detail.module').then(m => m.WorkoutDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/progress/progress.module').then(m => m.ProgressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workout-view/:workoutId/:duration',
    loadChildren: () => import('./pages/workout-view/workout-view.module').then(m => m.WorkoutViewPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
  
export class AppRoutingModule {}