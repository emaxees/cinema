import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/types/movie.type';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  loading$: Observable<boolean>;
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = movieService.entities$;
    this.loading$ = movieService.loading$;
  }

  ngOnInit(): void {
    this.movieService.getAll();
  }

}
