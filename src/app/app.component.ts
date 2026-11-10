import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyAuthService } from './service/academy-auth.service';

@Component({ standalone: false, selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
  readonly title = 'Innovacare Academy';
  readonly user$ = this.auth.user$;
  readonly profile$ = this.auth.profile$;
  menuOpen = false;
  constructor(public readonly auth: AcademyAuthService, private readonly router: Router) {}
  async logout(): Promise<void> {
    await this.auth.logout();
    this.menuOpen = false;
    await this.router.navigate(['/']);
  }
}
