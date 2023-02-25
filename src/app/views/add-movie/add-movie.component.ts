import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/types/movie.type';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  constructor(private movieService: MovieService) {

  }

  form = new FormGroup({
    title: new FormControl({ value: '', disabled: false }),
    imageUrl: new FormControl(""),
    genres:  new FormControl(""),
    time: new FormControl(""),
    ageRestriction: new FormControl(""),
    descriptionShort: new FormControl(""),
    descriptionLong: new FormControl(""),
    duration: new FormControl(""),
    isPremiere: new FormControl({ value: false, disabled: false }),
  });

  onSubmit() {
    const movie = this.form.value;
    this.movieService.add(movie)
  }
}
