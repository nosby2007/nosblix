import { WeekDay } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {
  getMovieDetails(id: any) {
    throw new Error('Method not implemented.');
  }
  getSearch: any;
  get: any;
  getSearchMovie(value: Partial<{ movieName: null; }>) {
    throw new Error('Method not implemented.');
  }
  getSearchForm(value: Partial<{ movieName: null; }>) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  baseurl = "https://api.themoviedb.org/3/";
  
  apikey =  "abf6987751340a495cec69b226825911";

  //bannerapidata

  bannerApiData():Observable<any> 
  {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }

  //trendingMovieApidata
  trendingMovieApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  
  }
  //sercheMovie
  searchMovie(data:any):Observable<any>{
    console.log(data, 'movie#');
    

    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  MovieDetails(data:any):Observable<any>
  {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`);
  }
//getMovieVideo
  getMovieVideo(data:any):Observable<any>
  {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`);
  }

  //getMovieCast
  getMovieCast(data:any):Observable<any> 
  {
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`);
  }


}
