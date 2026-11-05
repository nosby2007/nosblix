import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MoviedetailsComponent } from './pages/movie-details/movie-details.component';
@NgModule({declarations:[AppComponent,HomeComponent,SearchComponent,MoviedetailsComponent],imports:[BrowserModule,FormsModule,AppRoutingModule],bootstrap:[AppComponent]}) export class AppModule {}
