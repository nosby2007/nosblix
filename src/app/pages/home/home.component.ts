import { Component } from '@angular/core';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyAuthService } from '../../service/academy-auth.service';

@Component({ standalone: false, selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
  readonly courses$ = this.catalog.courses$;
  readonly loading$ = this.catalog.loading$;
  readonly error$ = this.catalog.error$;
  readonly user$ = this.auth.user$;
  constructor(public readonly catalog: AcademyCatalogService, public readonly auth: AcademyAuthService) {}
}
