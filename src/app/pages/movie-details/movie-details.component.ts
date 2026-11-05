import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademyCatalogService, AcademyCourse } from '../../service/academy-catalog.service';
import { environment } from '../../../environments/environment';
@Component({selector:'app-movie-details',templateUrl:'./movie-details.component.html',styleUrls:['./movie-details.component.css']})
export class MoviedetailsComponent implements OnInit {
  course?:AcademyCourse;
  trainingUrl=environment.trainingBaseUrl;
  constructor(private route:ActivatedRoute,public catalog:AcademyCatalogService){}
  ngOnInit(){this.route.paramMap.subscribe(params=>{this.catalog.courses$.subscribe(courses=>this.course=courses.find(c=>c.id===params.get('id')));});}
  get launchUrl(){return this.trainingUrl+'/learner/courses/'+encodeURIComponent(this.course?.id||'');}
}
