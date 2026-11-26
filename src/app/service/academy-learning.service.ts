import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { collection, collectionGroup, onSnapshot, query, where } from 'firebase/firestore';
import { AcademyAuthService } from './academy-auth.service';
import { AcademyEnrollment, OrganizationTrainingSummary } from '../models/academy.models';

@Injectable({ providedIn: 'root' })
export class AcademyLearningService implements OnDestroy {
  readonly enrollments$ = new BehaviorSubject<AcademyEnrollment[]>([]);
  readonly loading$ = new BehaviorSubject(false);
  readonly error$ = new BehaviorSubject('');
  readonly organization$ = new BehaviorSubject<OrganizationTrainingSummary | null>(null);
  private stops: Array<() => void> = [];
  private readonly subscriptions = new Subscription();

  constructor(private readonly auth: AcademyAuthService) {
    this.subscriptions.add(auth.user$.subscribe(user => this.connectEnrollments(user?.uid)));
    this.subscriptions.add(auth.profile$.subscribe(profile => {
      if (profile?.orgId && ['admin', 'manager', 'super_admin'].includes(profile.role)) this.connectOrganization(profile.orgId);
      else this.organization$.next(null);
    }));
  }

  private connectEnrollments(uid?: string): void {
    this.stops.forEach(stop => stop());
    this.stops = [];
    this.enrollments$.next([]);
    this.error$.next('');
    if (!uid) return;
    this.loading$.next(true);
    this.stops.push(onSnapshot(collection(this.auth.db, `users/${uid}/enrollments`), snapshot => {
      this.enrollments$.next(snapshot.docs.map(item => {
        const raw = item.data();
        const status = String(raw['status'] || 'assigned');
        const fallbackProgress = status === 'completed' ? 100 : (status === 'in_progress' || status === 'in-progress' || status === 'started' ? 10 : 0);
        return {
          id: item.id,
          courseId: String(raw['courseId'] || item.id),
          status,
          progress: Math.max(0, Math.min(100, Number(raw['progress'] ?? fallbackProgress))),
          score: typeof raw['score'] === 'number' ? raw['score'] : undefined,
          certificateId: raw['certificateId'] ? String(raw['certificateId']) : undefined,
          completedAt: raw['completedAt'],
          dueDate: raw['dueDate'],
        };
      }));
      this.loading$.next(false);
    }, () => {
      this.loading$.next(false);
      this.error$.next('Your learning activity could not be loaded.');
    }));
  }

  private connectOrganization(orgId: string): void {
    let learnerCount = 0;
    let enrollments: AcademyEnrollment[] = [];
    const update = () => {
      const completed = enrollments.filter(item => item.status === 'completed').length;
      const average = enrollments.length ? Math.round(enrollments.reduce((sum, item) => sum + item.progress, 0) / enrollments.length) : 0;
      this.organization$.next({ learners: learnerCount, enrollments: enrollments.length, completed, averageProgress: average });
    };
    const learnersQuery = query(collection(this.auth.db, 'users'), where('orgId', '==', orgId), where('role', '==', 'learner'));
    this.stops.push(onSnapshot(learnersQuery, snapshot => { learnerCount = snapshot.size; update(); }, () => this.organization$.next(null)));
    const enrollmentQuery = query(collectionGroup(this.auth.db, 'enrollments'), where('orgId', '==', orgId));
    this.stops.push(onSnapshot(enrollmentQuery, snapshot => {
      enrollments = snapshot.docs.map(item => {
        const raw = item.data();
        const status = String(raw['status'] || 'assigned');
        return {
          id: item.id,
          courseId: String(raw['courseId'] || item.id),
          status,
          progress: Number(raw['progress'] ?? (status === 'completed' ? 100 : 0)),
        };
      });
      update();
    }, () => this.organization$.next(null)));
  }

  ngOnDestroy(): void {
    this.stops.forEach(stop => stop());
    this.subscriptions.unsubscribe();
  }
}
