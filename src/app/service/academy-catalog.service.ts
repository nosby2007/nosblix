import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { collection, getFirestore, onSnapshot, query, where, Firestore } from 'firebase/firestore';
import { AcademyAuthService } from './academy-auth.service';
import { environment } from '../../environments/environment';

export interface AcademyCourse {
  id: string; title: string; description: string; level: string; category: string; duration: string;
  sections?: Array<{title: string; lessons?: Array<{title: string; blocks?: Array<{type: string; content?: string}>}>}>;
}
/** Read-only catalog projection. The canonical course, quiz and enrollment data live in Innovacare Training. */
@Injectable({ providedIn: 'root' })
export class AcademyCatalogService {
  readonly courses$ = new BehaviorSubject<AcademyCourse[]>([]);
  readonly error$ = new BehaviorSubject<string>('');
  private readonly db: Firestore;
  private unsubscribe?: () => void;
  private authSubscription: Subscription;
  constructor(auth: AcademyAuthService) {
    this.db = getFirestore(auth.auth.app);
    this.authSubscription = auth.user$.subscribe(user => {
      this.unsubscribe?.();
      this.courses$.next([]);
      this.error$.next('');
      if (!user) return;
      // Public courses only: organization-specific visibility remains in the canonical Training application.
      const publicCourses = query(collection(this.db, 'courses'), where('active', '==', true), where('isPublic', '==', true));
      this.unsubscribe = onSnapshot(publicCourses, snapshot => {
        this.courses$.next(snapshot.docs.map(doc => {
          const c = doc.data();
          return {id:doc.id,title:String(c['title']||''),description:String(c['description']||''),level:String(c['level']||'Course'),category:String(c['type']||'Training'),duration:String(c['durationMin']||0)+' min'};
        }));
      }, () => this.error$.next('Course catalog is unavailable. Check Firestore access rules and connection.'));
    });
  }
}
