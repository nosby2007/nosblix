import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademyCatalogService } from '../../service/academy-catalog.service';
import { environment } from '../../../environments/environment';

@Component({ standalone: false, selector: 'app-handoff', template: `
<div class="page narrow"><a [routerLink]="['/course',courseId]" class="back-link">← Course details</a><section class="handoff-card"><div class="handoff-icon">↗</div><span class="eyebrow">SECURE LEARNING TRANSITION</span><h1>Continue in Innovacare Training</h1><p>You are opening <b>{{courseTitle}}</b> in the canonical learning engine. It controls lesson completion, quiz navigation, exams, grading, progress and certificates.</p><div class="handoff-steps"><div><span>1</span><p><b>Open Training</b><small>A new tab keeps your Academy page available.</small></p></div><div><span>2</span><p><b>Confirm your session</b><small>Browser sessions cannot be shared safely across different domains. Sign in again if requested.</small></p></div><div><span>3</span><p><b>Resume learning</b><small>Training applies enrollment and organization authorization before content opens.</small></p></div></div><div class="alert info">No answers, grading rules or private course content are copied into Academy.</div><div class="button-row center"><a class="button primary" [href]="launchUrl" target="_blank" rel="noopener noreferrer">Open course player ↗</a><a class="button ghost" [href]="detailUrl" target="_blank" rel="noopener noreferrer">Open course overview</a></div></section></div>` })
export class HandoffComponent implements OnInit {
  courseId=''; courseTitle='Course'; launchUrl=''; detailUrl='';
  constructor(private readonly route: ActivatedRoute, private readonly catalog: AcademyCatalogService) {}
  ngOnInit(): void { this.courseId=this.route.snapshot.paramMap.get('id') || ''; this.courseTitle=this.catalog.getById(this.courseId)?.title || this.courseId; const encoded=encodeURIComponent(this.courseId); this.detailUrl=`${environment.trainingBaseUrl}/learner/courses/${encoded}`; this.launchUrl=`${environment.trainingBaseUrl}/learner/courses/${encoded}/view`; }
}
