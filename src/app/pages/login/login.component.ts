import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyAuthService } from '../../service/academy-auth.service';
@Component({selector:'app-academy-login',template:`
<main class="academy"><section class="login-panel"><span class="eyebrow">INNOVACARE ACADEMY</span><h1>Sign in</h1>
<form (ngSubmit)="submit()"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" [(ngModel)]="email" required>
<label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" [(ngModel)]="password" required>
<p *ngIf="error" role="alert">{{error}}</p><button class="primary" type="submit" [disabled]="busy">{{busy?'Signing in…':'Sign in'}}</button></form>
<p class="muted">Use your existing Innovacare Training account.</p></section></main>`})
export class AcademyLoginComponent {
  email='';password='';busy=false;error='';
  constructor(private auth:AcademyAuthService,private router:Router){}
  async submit(){this.busy=true;this.error='';try{await this.auth.login(this.email,this.password);await this.router.navigate(['/']);}catch{this.error='Unable to sign in. Check your credentials.';}finally{this.busy=false;}}
}
