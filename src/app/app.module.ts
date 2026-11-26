import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchComponent, AcademyAuthComponent, CourseDetailComponent, DashboardComponent, LearningComponent, HandoffComponent, InfoPageComponent, OrganizationComponent, ProfileComponent],
  imports: [BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
