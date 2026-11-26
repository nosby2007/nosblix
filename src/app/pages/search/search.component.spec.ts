import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { SearchComponent } from './search.component';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyCourse } from '../../models/academy.models';

const course: AcademyCourse={id:'wound-1',title:'Wound Care Essentials',subtitle:'',description:'Clinical foundations',level:'Beginner',category:'Health',durationMin:30,language:'EN',lecturer:'Faculty',tags:['wound'],allowedEmailDomains:[],targetAudience:[],prerequisites:[],sections:[],isPublic:true,active:true,certification:false};

describe('SearchComponent',()=>{
  beforeEach(async()=>{await TestBed.configureTestingModule({imports:[RouterTestingModule],declarations:[SearchComponent],providers:[{provide:AcademyCatalogService,useValue:{courses$:new BehaviorSubject([course]),loading$:new BehaviorSubject(false),error$:new BehaviorSubject(''),retry:()=>undefined}}]}).compileComponents();});
  it('filters by text, category and level',()=>{const component=TestBed.createComponent(SearchComponent).componentInstance;component.query='wound';expect(component.matches(course)).toBeTrue();component.level='Advanced';expect(component.matches(course)).toBeFalse();});
  it('derives canonical catalogue filters',()=>{const component=TestBed.createComponent(SearchComponent).componentInstance;expect(component.categories).toEqual(['All','Health']);expect(component.levels).toEqual(['All','Beginner']);});
});
