import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initializeApp, getApps } from 'firebase/app';
import { Auth, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AcademyAuthService {
  readonly user$ = new BehaviorSubject<User | null>(null);
  readonly ready$ = new BehaviorSubject<boolean>(false);
  readonly auth: Auth;
  constructor() {
    const app = getApps().find(a => a.name === 'academy') || initializeApp(environment.firebase, 'academy');
    this.auth = getAuth(app);
    onAuthStateChanged(this.auth, user => { this.user$.next(user); this.ready$.next(true); }, () => this.ready$.next(true));
  }
  login(email: string, password: string) { return signInWithEmailAndPassword(this.auth, email, password); }
  logout() { return signOut(this.auth); }
}
