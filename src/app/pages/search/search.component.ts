import { Component } from '@angular/core';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyCourse } from '../../models/academy.models';

@Component({ standalone: false, selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css'] })
export class SearchComponent {
  query = '';
  category = 'All';
  level = 'All';
  readonly courses$ = this.catalog.courses$;
  readonly loading$ = this.catalog.loading$;
  readonly error$ = this.catalog.error$;
  constructor(public readonly catalog: AcademyCatalogService) {}
  get categories(): string[] { return ['All', ...new Set(this.catalog.courses$.value.map(course => course.category))]; }
  get levels(): string[] { return ['All', ...new Set(this.catalog.courses$.value.map(course => course.level))]; }
  matches(course: AcademyCourse): boolean {
    const query = this.query.trim().toLowerCase();
    const matchesText = !query || [course.title, course.description, course.category, course.lecturer, ...course.tags].some(value => value.toLowerCase().includes(query));
    return matchesText && (this.category === 'All' || course.category === this.category) && (this.level === 'All' || course.level === this.level);
  }
}
