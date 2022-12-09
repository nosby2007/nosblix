import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MoviedetailsComponent implements OnInit{

  constructor(private service:MovieApiServiceService, private router:ActivatedRoute){}
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;


  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getparamid#');
    
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  getMovie(id:any){
    this.service.MovieDetails(id).subscribe((result)=>{
      console.log(result, 'moviedetails#');
      this.getMovieDetailResult = result;
      
    });
  }


  getVideo(id:any)
  {
    this.service.getMovieVideo(id).subscribe((result)=>{
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element:any) => {
          if(element.type=="Trailer")
          {
            this.getMovieVideoResult = element.key;
          }
      });
      
    });
  }

  getMovieCast(id:any)
  {
    this.service.getMovieCast(id).subscribe((result)=>{
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
      
    });
  }

      
}
