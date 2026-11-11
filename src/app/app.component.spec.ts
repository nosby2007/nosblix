import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { AcademyAuthService } from './service/academy-auth.service';

describe('AppComponent', () => {
  const auth = { user$: new BehaviorSubject(null), profile$: new BehaviorSubject(null), logout: jasmine.createSpy('logout').and.resolveTo() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [RouterTestingModule], declarations: [AppComponent], providers: [{ provide: AcademyAuthService, useValue: auth }] }).compileComponents(); });
  it('creates the Academy shell', () => { const app=TestBed.createComponent(AppComponent).componentInstance; expect(app.title).toBe('Innovacare Academy'); });
  it('renders accessible primary navigation', () => { const fixture=TestBed.createComponent(AppComponent); fixture.detectChanges(); expect((fixture.nativeElement as HTMLElement).querySelector('nav[aria-label="Primary navigation"]')).toBeTruthy(); });
});
