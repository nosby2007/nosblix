import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initializeApp, getApps } from 'firebase/app';
import {
  Auth,
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Firestore, doc, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { AcademyProfile } from '../models/academy.models';

@Injectable({ providedIn: 'root' })
export class AcademyAuthService implements OnDestroy {
  readonly user$ = new BehaviorSubject<User | null>(null);
  readonly profile$ = new BehaviorSubject<AcademyProfile | null>(null);
  readonly ready$ = new BehaviorSubject(false);
  readonly auth: Auth;
  readonly db: Firestore;
  private stopAuth?: () => void;
  private stopProfile?: () => void;

  constructor() {
    const app = getApps().find(candidate => candidate.name === 'academy') || initializeApp(environment.firebase, 'academy');
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    void setPersistence(this.auth, browserLocalPersistence).catch(() => undefined);
    this.stopAuth = onAuthStateChanged(this.auth, user => this.restore(user), () => this.restore(null));
  }

  private restore(user: User | null): void {
    this.stopProfile?.();
    this.stopProfile = undefined;
    this.user$.next(user);
    this.profile$.next(null);
    if (!user) {
      this.ready$.next(true);
      return;
    }
    this.ready$.next(false);
    this.stopProfile = onSnapshot(doc(this.db, `users/${user.uid}`), snapshot => {
      this.profile$.next(snapshot.exists() ? ({ uid: snapshot.id, ...snapshot.data() } as AcademyProfile) : null);
      this.ready$.next(true);
    }, () => {
      this.profile$.next(null);
      this.ready$.next(true);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email.trim().toLowerCase(), password);
  }

  async register(displayName: string, email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = displayName.trim();
    const credential = await createUserWithEmailAndPassword(this.auth, normalizedEmail, password);
    if (normalizedName) await updateProfile(credential.user, { displayName: normalizedName });
    await setDoc(doc(this.db, `users/${credential.user.uid}`), {
      uid: credential.user.uid,
      email: credential.user.email ?? normalizedEmail,
      displayName: normalizedName,
      role: 'learner',
      active: true,
      orgId: null,
      orgType: null,
      accountType: 'individual',
      onboardingSource: 'academy-self-serve',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
      activityUpdatedAt: serverTimestamp(),
      totalAppSeconds: 0,
    });
    return credential.user;
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email.trim().toLowerCase());
  }

  async updateDisplayName(displayName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    const value = displayName.trim();
    await updateProfile(user, { displayName: value });
    await updateDoc(doc(this.db, `users/${user.uid}`), { displayName: value, updatedAt: serverTimestamp() });
  }

  logout() { return signOut(this.auth); }

  ngOnDestroy(): void {
    this.stopAuth?.();
    this.stopProfile?.();
  }
}
