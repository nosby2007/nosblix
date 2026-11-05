import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
@Component({ selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css'] })
export class HomeComponent {
  courses = this.courseService.list();
  constructor(private courseService: CourseService) {}
}
