import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const allowedKeys = ['location', 'language'];

export const queryParamsGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const enteredKeys = route.queryParamMap.keys;

  if (enteredKeys.length === 0) {
    return true;
  }

  const hasInvalidKey = enteredKeys.some(key => !allowedKeys.includes(key));

  if (hasInvalidKey) {
    router.navigate(['/not-found'], { skipLocationChange: true });
    return false;
  }

  return true;
};