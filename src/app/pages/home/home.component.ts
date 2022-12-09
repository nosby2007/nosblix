import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service:MovieApiServiceService){ }
  
bannerResult : any = []
trendingMovieResult :any = []
actionMovieResult : any = []
animationMovieResult : any = []
aventureMovieResult : any = []
comedyMovieResult : any = []
documentaryMovieResult : any = []
scienceFictionMovieResult : any = []
thrillerMovieResult : any = []

ngOnInit(): void {
  this.bannerData();
  this.trendingData();
  this.actionMovie();
  this.aventureMovie();
  this.comedyMovie();
  this.documentaryMovie();
  this.scienceFictionMovie();
  this.animationMovie();
  this.thrillerMovie();

    
}

  //bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result)=>{
      console.log(result,'bannerresult#');
      this.bannerResult = result.results;
      
    });
  }

    trendingData(){
      this.service.trendingMovieApiData().subscribe((result)=>{
        console.log(result,'trendingresult#');
        
      this.trendingMovieResult = result.results;
    });
  }

  actionMovie(){
    this.service.fetchActionMovies().subscribe((result)=>{
      console.log(result,'actionmoviest#');
      this.actionMovieResult = result.results;

  });

}
  aventureMovie(){
    this.service.fetchAventureMovies().subscribe((result)=>{
      console.log(result,'aventuremoviest#');
      this.aventureMovieResult = result.results;
  });
  
}
comedyMovie(){
    this.service.fetchComedyeMovies().subscribe((result)=>{
      console.log(result,'comedymoviest#');
      this.comedyMovieResult = result.results;
  });
}
scienceFictionMovie(){
    this.service.fetchScienceFictionMovies().subscribe((result)=>{
      console.log(result,'sciencefictionmoviest#');
      this.comedyMovieResult = result.results;
  });
}
animationMovie(){
    this.service.fetchAnimationMovies().subscribe((result)=>{
      console.log(result,'animationmoviest#');
      this.animationMovieResult = result.results;
  });
}

documentaryMovie(){
    this.service.fetchDocumentaryMovies().subscribe((result)=>{
      console.log(result,'documentarymoviest#');
      this.documentaryMovieResult = result.results;
  });

  }

thrillerMovie(){
    this.service.fetchThrillerMovies().subscribe((result)=>{
      console.log(result,'thrillermoviest#');
      this.thrillerMovieResult = result.results;
  });

  }


}
