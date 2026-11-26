import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AcademyAuthService } from '../service/academy-auth.service';

@Injectable({ providedIn: 'root' })
export class OrganizationGuard implements CanActivate {
  constructor(private readonly auth: AcademyAuthService, private readonly router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.ready$.pipe(
      filter(Boolean),
      take(1),
      map(() => {
        const profile = this.auth.profile$.value;
        return profile?.orgId && ['admin', 'manager', 'super_admin'].includes(profile.role)
          ? true
          : this.router.createUrlTree(['/dashboard']);
      }),
    );
  }
}
