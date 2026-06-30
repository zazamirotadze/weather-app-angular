import { Routes } from '@angular/router';
import { locationGuard } from '../guards/location.guard';
import { notFoundGuard } from '../guards/not-found.guard';
import { queryParamsGuard } from '../guards/query-params.guard';

export const routes: Routes = [
  {
    path: 'forecast',
    loadComponent: () => import('../pages/forecast/forecast').then(m => m.Forecast),
    canActivate: [queryParamsGuard, locationGuard]
  },
  {
    path: 'videos',
    loadComponent: () => import('../pages/videos/videos').then(m => m.Videos),
    canActivate: [queryParamsGuard]
  },
  {
    path: 'map',
    loadComponent: () => import('../pages/map/map').then(m => m.Map),
    canActivate: [queryParamsGuard]
  },
  {
    path: '',
    redirectTo: 'forecast',
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    loadComponent: () => import('../pages/not-found/not-found').then(m => m.NotFound),
    canActivate: [notFoundGuard] 
  },
  {
    path: '**', 
    loadComponent: () => import('../pages/not-found/not-found').then(m => m.NotFound)
  }
];