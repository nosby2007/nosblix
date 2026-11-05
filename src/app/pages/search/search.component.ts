import { Component } from '@angular/core';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
@Component({ selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css'] })
export class SearchComponent {
  query='';
  courses$=this.catalog.courses$;
  constructor(public catalog:AcademyCatalogService){}
  matches(c:any){const q=this.query.trim().toLowerCase();return [c.title,c.description,c.category].some((x:string)=>x.toLowerCase().includes(q));}
}
