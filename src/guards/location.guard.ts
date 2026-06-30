import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WeatherState } from '../services/weatherState';

export const locationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const weatherState = inject(WeatherState);

  const location = route.queryParamMap.get('location') || 'Tsrikvali';
  weatherState.setLocation(location);

  if (!weatherState.supportedLocation()) {
    router.navigate(['/not-found'], { skipLocationChange: true });
    return false;
  }
  return true;
};