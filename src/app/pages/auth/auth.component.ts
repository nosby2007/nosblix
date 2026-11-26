import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyAuthService } from '../../service/academy-auth.service';

type AuthMode = 'login' | 'register' | 'reset';

@Component({ standalone: false, selector: 'app-academy-auth', template: `
<div class="page auth-page"><section class="auth-aside"><span class="eyebrow">INNOVACARE ACADEMY</span><h1>Your next skill starts here.</h1><p>Use one Innovacare Training identity across the Academy discovery experience and canonical learning engine.</p><div class="quote-card">“Education becomes meaningful when it improves the next patient interaction.”</div></section>
<section class="panel auth-panel"><div class="auth-tabs" role="tablist"><button type="button" [class.active]="mode==='login'" (click)="setMode('login')">Sign in</button><button type="button" [class.active]="mode==='register'" (click)="setMode('register')">Register</button></div>
<span class="eyebrow">{{mode==='reset' ? 'ACCOUNT RECOVERY' : mode==='register' ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}}</span><h2>{{mode==='reset' ? 'Reset your password' : mode==='register' ? 'Join the Academy' : 'Sign in to continue'}}</h2>
<form (ngSubmit)="submit()" #authForm="ngForm">
<label *ngIf="mode==='register'"><span>Full name</span><input name="name" [(ngModel)]="displayName" autocomplete="name" required></label>
<label><span>Email address</span><input name="email" [(ngModel)]="email" type="email" autocomplete="email" required></label>
<label *ngIf="mode!=='reset'"><span>Password</span><input name="password" [(ngModel)]="password" type="password" [autocomplete]="mode==='register' ? 'new-password' : 'current-password'" minlength="8" required></label>
<label class="check-row" *ngIf="mode==='register'"><input type="checkbox" name="terms" [(ngModel)]="accepted" required><span>I agree to use the platform for authorized learning and understand that exams and credentials are managed by Innovacare Training.</span></label>
<div class="alert error" *ngIf="error" role="alert">{{error}}</div><div class="alert success" *ngIf="notice" role="status">{{notice}}</div>
<button class="button primary full" type="submit" [disabled]="busy || authForm.invalid">{{busy ? 'Please wait…' : mode==='reset' ? 'Send reset email' : mode==='register' ? 'Create account' : 'Sign in'}}</button>
</form><button class="text-button reset-link" type="button" *ngIf="mode==='login'" (click)="setMode('reset')">Forgot your password?</button><button class="text-button reset-link" type="button" *ngIf="mode==='reset'" (click)="setMode('login')">Back to sign in</button>
<p class="fine-print">Organization members should use the email and account already issued by their organization. Registration never grants an organization role.</p></section></div>` })
export class AcademyAuthComponent {
  mode: AuthMode = 'login'; displayName = ''; email = ''; password = ''; accepted = false; busy = false; error = ''; notice = '';
  constructor(private readonly auth: AcademyAuthService, private readonly router: Router, private readonly route: ActivatedRoute) {}
  setMode(mode: AuthMode): void { this.mode = mode; this.error = ''; this.notice = ''; }
  async submit(): Promise<void> {
    this.busy = true; this.error = ''; this.notice = '';
    try {
      if (this.mode === 'reset') { await this.auth.resetPassword(this.email); this.notice = 'Password reset instructions have been sent if this account exists.'; return; }
      if (this.mode === 'register') await this.auth.register(this.displayName, this.email, this.password);
      else await this.auth.login(this.email, this.password);
      const destination = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      await this.router.navigateByUrl(destination.startsWith('/') ? destination : '/dashboard');
    } catch (error: any) { this.error = this.message(error?.code); } finally { this.busy = false; }
  }
  private message(code?: string): string {
    if (code?.includes('email-already-in-use')) return 'An account already exists for this email. Sign in or reset the password.';
    if (code?.includes('weak-password')) return 'Use a password of at least 8 characters.';
    if (code?.includes('invalid-credential')) return 'The email or password is incorrect.';
    if (code?.includes('too-many-requests')) return 'Too many attempts. Wait a moment and try again.';
    return 'We could not complete this request. Check the form and your connection.';
  }
}
