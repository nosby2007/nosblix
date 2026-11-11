import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { collection, doc, getDoc, onSnapshot, query, where, Query, DocumentData } from 'firebase/firestore';
import { AcademyAuthService } from './academy-auth.service';
import { AcademyCourse, AcademyProfile, SectionSummary } from '../models/academy.models';

type Assignment = { courseId?: string; active?: boolean };

@Injectable({ providedIn: 'root' })
export class AcademyCatalogService implements OnDestroy {
  readonly courses$ = new BehaviorSubject<AcademyCourse[]>([]);
  readonly loading$ = new BehaviorSubject(true);
  readonly error$ = new BehaviorSubject('');
  private stops: Array<() => void> = [];
  private readonly subscriptions = new Subscription();
  private generation = 0;

  constructor(private readonly auth: AcademyAuthService) {
    this.subscriptions.add(auth.profile$.subscribe(profile => this.connect(profile)));
    this.subscriptions.add(auth.user$.subscribe(user => { if (!user) this.connect(null); }));
  }

  getById(id: string): AcademyCourse | undefined {
    return this.courses$.value.find(course => course.id === id);
  }

  retry(): void { this.connect(this.auth.profile$.value); }

  private connect(profile: AcademyProfile | null): void {
    const generation = ++this.generation;
    this.stops.forEach(stop => stop());
    this.stops = [];
    this.loading$.next(true);
    this.error$.next('');
    this.courses$.next([]);

    if (profile?.active === false) {
      this.loading$.next(false);
      this.error$.next('This account is inactive. Contact your organization administrator.');
      return;
    }

    const role = profile?.role || 'guest';
    if ((role === 'super_admin')) {
      this.listen([query(collection(this.auth.db, 'courses'))], generation);
      return;
    }
    if (profile?.orgId && ['admin', 'manager', 'learner'].includes(role)) {
      const courses = collection(this.auth.db, 'courses');
      const assignments = query(collection(this.auth.db, 'organizationCourseAssignments'), where('orgId', '==', profile.orgId));
      this.listen([
        query(courses, where('assignedOrgIds', 'array-contains', profile.orgId)),
        query(courses, where('orgId', '==', profile.orgId)),
      ], generation, assignments);
      return;
    }
    this.listen([
      query(collection(this.auth.db, 'courses'), where('active', '==', true), where('isPublic', '==', true)),
    ], generation, undefined, profile?.email);
  }

  private listen(queries: Query<DocumentData>[], generation: number, assignmentQuery?: Query<DocumentData>, email?: string): void {
    const buckets = new Map<number, AcademyCourse[]>();
    let pending = queries.length + (assignmentQuery ? 1 : 0);
    const publish = () => {
      if (generation !== this.generation) return;
      pending = Math.max(0, pending - 1);
      const merged = new Map<string, AcademyCourse>();
      buckets.forEach(items => items.forEach(item => merged.set(item.id, item)));
      const result = [...merged.values()]
        .filter(course => course.active)
        .filter(course => this.emailAllowed(course, email))
        .sort((a, b) => a.title.localeCompare(b.title));
      this.courses$.next(result);
      if (pending === 0) this.loading$.next(false);
    };
    const fail = () => {
      if (generation !== this.generation) return;
      this.loading$.next(false);
      this.error$.next('The course catalogue could not be loaded. Check your access or connection, then retry.');
    };
    queries.forEach((courseQuery, index) => {
      this.stops.push(onSnapshot(courseQuery, snapshot => {
        buckets.set(index, snapshot.docs.map(item => this.mapCourse(item.id, item.data())));
        publish();
      }, fail));
    });
    if (assignmentQuery) {
      this.stops.push(onSnapshot(assignmentQuery, async snapshot => {
        const ids = snapshot.docs.map(item => item.data() as Assignment)
          .filter(item => item.active !== false && item.courseId)
          .map(item => String(item.courseId));
        const loaded = await Promise.all(ids.map(async id => {
          try {
            const result = await getDoc(doc(this.auth.db, `courses/${id}`));
            return result.exists() ? this.mapCourse(result.id, result.data()) : null;
          } catch { return null; }
        }));
        buckets.set(queries.length, loaded.filter((item): item is AcademyCourse => !!item));
        publish();
      }, fail));
    }
  }

  private mapCourse(id: string, raw: DocumentData): AcademyCourse {
    const sections: SectionSummary[] = Array.isArray(raw['sections']) ? raw['sections'].map((section: any, sectionIndex: number) => ({
      id: String(section.id || sectionIndex),
      title: String(section.title || `Section ${sectionIndex + 1}`),
      lessons: Array.isArray(section.lessons) ? section.lessons.map((lesson: any, lessonIndex: number) => ({
        id: String(lesson.id || lessonIndex),
        title: String(lesson.title || `Lesson ${lessonIndex + 1}`),
        minutes: Number(lesson.durationMin || lesson.minutes || 0),
        blockTypes: Array.isArray(lesson.blocks) ? lesson.blocks.map((block: any) => String(block.type || 'content')) : [],
      })) : [],
    })) : [];
    return {
      id,
      title: String(raw['title'] || 'Untitled course'),
      subtitle: String(raw['subtitle'] || ''),
      description: String(raw['description'] || ''),
      level: String(raw['level'] || 'All levels'),
      category: String(raw['type'] || raw['kind'] || 'Training'),
      durationMin: Number(raw['durationMin'] || 0),
      language: String(raw['lang'] || 'EN'),
      imageUrl: raw['imageUrl'] ? String(raw['imageUrl']) : undefined,
      lecturer: String(raw['lecturer'] || 'Innovacare Faculty'),
      tags: Array.isArray(raw['tags']) ? raw['tags'].map(String) : [],
      allowedEmailDomains: Array.isArray(raw['allowedEmailDomains']) ? raw['allowedEmailDomains'].map(String) : [],
      targetAudience: Array.isArray(raw['targetAudience']) ? raw['targetAudience'].map(String) : [],
      prerequisites: Array.isArray(raw['prerequisites']) ? raw['prerequisites'].map(String) : [],
      sections,
      isPublic: raw['isPublic'] === true,
      active: raw['active'] !== false,
      certification: raw['certification'] === true,
      ceCredit: typeof raw['ceCredit'] === 'number' ? raw['ceCredit'] : undefined,
    };
  }

  private emailAllowed(course: AcademyCourse, email?: string): boolean {
    const raw = course.allowedEmailDomains;
    if (!raw?.length) return true;
    const domain = email?.split('@')[1]?.toLowerCase();
    return !!domain && raw.map(item => item.toLowerCase()).includes(domain);
  }

  ngOnDestroy(): void {
    this.stops.forEach(stop => stop());
    this.subscriptions.unsubscribe();
  }
}
