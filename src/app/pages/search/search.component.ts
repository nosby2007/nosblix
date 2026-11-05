import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
@Component({ selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css'] })
export class SearchComponent {
  query = '';
  constructor(public courses: CourseService) {}
  get results() { return this.courses.search(this.query); }
}
