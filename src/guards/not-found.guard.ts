import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notFoundGuard: CanActivateFn = () => {
  const router = inject(Router);
  const navigation = router.getCurrentNavigation();

  if (navigation?.extras.skipLocationChange) {
    return true;
  }

  return router.createUrlTree(['/forecast']);
}; 