import { Component } from '@angular/core';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyAuthService } from '../../service/academy-auth.service';
import { environment } from '../../../environments/environment';
@Component({ selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
  courses$ = this.catalog.courses$;
  error$ = this.catalog.error$;
  user$ = this.auth.user$;
  trainingUrl = environment.trainingBaseUrl;
  constructor(public catalog: AcademyCatalogService, public auth: AcademyAuthService) {}
}
