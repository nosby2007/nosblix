import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { AcademyAuthComponent } from './pages/auth/auth.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LearningComponent } from './pages/learning/learning.component';
import { HandoffComponent } from './pages/handoff/handoff.component';
import { InfoPageComponent } from './pages/info/info-page.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { OrganizationGuard } from './guards/organization.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogue', component: SearchComponent },
  { path: 'search', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'auth', component: AcademyAuthComponent },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'learning', component: LearningComponent, canActivate: [AuthGuard] },
  { path: 'certificates', component: LearningComponent, canActivate: [AuthGuard], data: { certificates: true } },
  { path: 'learn/:id', component: HandoffComponent, canActivate: [AuthGuard] },
  { path: 'organization', component: OrganizationComponent, canActivate: [AuthGuard, OrganizationGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'about', component: InfoPageComponent, data: { page: 'about' } },
  { path: 'support', component: InfoPageComponent, data: { page: 'support' } },
  { path: '**', redirectTo: '' },
];

@NgModule({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })], exports: [RouterModule] })
export class AppRoutingModule {}
