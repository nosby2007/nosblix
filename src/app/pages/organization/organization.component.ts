import { Component } from '@angular/core';
import { AcademyAuthService } from '../../service/academy-auth.service';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyLearningService } from '../../service/academy-learning.service';
import { environment } from '../../../environments/environment';

@Component({ standalone: false, selector: 'app-organization', template: `
<div class="page"><section class="dashboard-hero"><div><span class="eyebrow">ORGANIZATION TRAINING</span><h1>Learning overview</h1><p>Read-only visibility for the organization attached to your canonical Training profile.</p></div><a class="button primary" [href]="adminUrl" target="_blank" rel="noopener">Open Training administration ↗</a></section>
<div class="alert info">Academy does not grant roles or modify assignments. Administration remains protected by Training roles and Firestore rules.</div>
<div class="stat-grid" *ngIf="summary$|async as summary"><div class="stat-card"><span>Learners</span><strong>{{summary.learners}}</strong><small>organization profiles</small></div><div class="stat-card"><span>Enrollments</span><strong>{{summary.enrollments}}</strong><small>visible assignments</small></div><div class="stat-card"><span>Completed</span><strong>{{summary.completed}}</strong><small>course records</small></div><div class="stat-card"><span>Average progress</span><strong>{{summary.averageProgress}}%</strong><small>visible records</small></div></div>
<section class="section"><div class="section-heading"><div><span class="eyebrow">ASSIGNED COURSES</span><h2>Organization catalogue</h2></div><span class="muted">{{(courses$|async)?.length || 0}} active courses</span></div><div class="course-grid"><a class="course-card" *ngFor="let course of courses$|async" [routerLink]="['/course',course.id]"><div class="course-art"><span class="pill">{{course.category}}</span><strong>+</strong></div><div class="course-body"><div class="meta">{{course.level}} · {{course.durationMin}} min</div><h3>{{course.title}}</h3><p>{{course.description}}</p><span class="course-link">View course →</span></div></a></div></section>
<section class="panel"><h2>Administrative actions</h2><p>Manage learners, assignments, activation, exams and reporting in the canonical application.</p><div class="quick-links horizontal"><a [href]="adminUrl+'/learners'" target="_blank" rel="noopener"><b>Learners</b><span>Enrollment visibility ↗</span></a><a [href]="adminUrl+'/courses'" target="_blank" rel="noopener"><b>Courses</b><span>Assignments ↗</span></a><a [href]="adminUrl" target="_blank" rel="noopener"><b>Reports</b><span>Training overview ↗</span></a></div></section></div>` })
export class OrganizationComponent {
  readonly summary$=this.learning.organization$; readonly courses$=this.catalog.courses$;
  get adminUrl(): string { const role=this.auth.profile$.value?.role; return environment.trainingBaseUrl+(role==='super_admin' ? '/super-admin' : '/manager'); }
  constructor(private readonly auth: AcademyAuthService, private readonly learning: AcademyLearningService, private readonly catalog: AcademyCatalogService) {}
}
