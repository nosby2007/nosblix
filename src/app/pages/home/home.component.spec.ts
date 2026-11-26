import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from './home.component';
import { AcademyAuthService } from '../../service/academy-auth.service';
import { AcademyCatalogService } from '../../service/academy-catalog.service';

describe('HomeComponent', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports:[RouterTestingModule], declarations:[HomeComponent], providers:[
    {provide:AcademyAuthService,useValue:{user$:new BehaviorSubject(null)}},
    {provide:AcademyCatalogService,useValue:{courses$:new BehaviorSubject([]),loading$:new BehaviorSubject(false),error$:new BehaviorSubject(''),retry:()=>undefined}}
  ]}).compileComponents(); });
  it('renders the Academy value proposition',()=>{const fixture=TestBed.createComponent(HomeComponent);fixture.detectChanges();expect((fixture.nativeElement as HTMLElement).textContent).toContain('Learn with confidence');});
});
