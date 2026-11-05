import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MoviedetailsComponent } from './pages/movie-details/movie-details.component';
import { AcademyLoginComponent } from './pages/login/login.component';
@NgModule({declarations:[AppComponent,HomeComponent,SearchComponent,MoviedetailsComponent,AcademyLoginComponent],imports:[BrowserModule,CommonModule,FormsModule,AppRoutingModule],bootstrap:[AppComponent]}) export class AppModule {}
