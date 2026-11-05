import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseService } from '../../service/course.service';
@Component({ selector: 'app-movie-details', templateUrl: './movie-details.component.html', styleUrls: ['./movie-details.component.css'] })
export class MoviedetailsComponent implements OnInit {
  course?: Course;
  activeLessonId = '';
  constructor(private route: ActivatedRoute, private courses: CourseService) {}
  ngOnInit(): void { this.route.paramMap.subscribe(params => { this.course = this.courses.find(params.get('id')); this.activeLessonId = this.course?.lessons[0]?.id || ''; }); }
  get activeLesson() { return this.course?.lessons.find(lesson => lesson.id === this.activeLessonId); }
  selectLesson(id: string): void { this.activeLessonId = id; }
}
