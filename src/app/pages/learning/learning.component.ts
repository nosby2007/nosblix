import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { AcademyLearningService } from '../../service/academy-learning.service';

@Component({ standalone: false, selector: 'app-learning', template: `
<div class="page"><section class="page-hero compact"><span class="eyebrow">{{certificatesOnly ? 'CREDENTIALS' : 'MY LEARNING'}}</span><h1>{{certificatesOnly ? 'Certificates' : 'Your learning library'}}</h1><p>{{certificatesOnly ? 'Completed course credentials are issued and verified by Innovacare Training.' : 'Review assigned, active and completed learning.'}}</p></section>
<div class="tabs"><a routerLink="/learning" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">All learning</a><a routerLink="/certificates" routerLinkActive="active">Certificates</a></div><div class="alert error" *ngIf="error$|async as error">{{error}}</div><div class="skeleton-grid" *ngIf="loading$|async"><div class="skeleton" *ngFor="let i of [1,2,3]"></div></div>
<section class="section no-top" *ngIf="!(loading$|async)"><div class="learning-list"><ng-container *ngFor="let item of visible"><article class="learning-row"><div class="learning-thumb">{{item.status==='completed' ? '✓' : '+'}}</div><div class="learning-info"><span class="meta">{{item.status.replace('_',' ')}}</span><h3>{{courseTitle(item.courseId)}}</h3><div class="progress-track"><i [style.width.%]="item.progress"></i></div><small>{{item.progress}}% complete<span *ngIf="item.score!==undefined"> · Score {{item.score}}%</span></small></div><a class="button primary compact" *ngIf="!certificatesOnly" [routerLink]="['/learn',item.courseId]">{{item.status==='completed' ? 'Review' : 'Continue'}}</a><a class="button ghost compact" *ngIf="certificatesOnly" href="https://innovacare-training.web.app/learner/certifications" target="_blank" rel="noopener">View credential ↗</a></article></ng-container></div>
<div class="empty-state" *ngIf="!visible.length"><div class="empty-icon">{{certificatesOnly ? '◇' : '⌁'}}</div><h3>{{certificatesOnly ? 'No certificates yet' : 'No assigned learning yet'}}</h3><p>{{certificatesOnly ? 'Certificates will appear after eligible course completion in Innovacare Training.' : 'Authorized public and organization courses remain available in the catalogue.'}}</p><a class="button primary" routerLink="/catalogue" *ngIf="!certificatesOnly">Explore catalogue</a></div></section></div>` })
export class LearningComponent implements OnInit {
  certificatesOnly = false; readonly loading$ = this.learning.loading$; readonly error$ = this.learning.error$;
  constructor(private readonly route: ActivatedRoute, private readonly learning: AcademyLearningService, private readonly catalog: AcademyCatalogService) {}
  ngOnInit(): void { this.certificatesOnly = this.route.snapshot.data['certificates'] === true; }
  get visible() { const items=this.learning.enrollments$.value; return this.certificatesOnly ? items.filter(item=>item.status==='completed' || !!item.certificateId) : items; }
  courseTitle(id: string): string { return this.catalog.getById(id)?.title || id; }
}
