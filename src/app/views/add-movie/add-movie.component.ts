import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { MovieService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/types/movie.type';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  constructor(private movieService: MovieService) {}

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
    const movie: Movie = {
      id: new Date().valueOf(),
      title: this.form.value.title,
      imageUrl: this.form.value.imageUrl,
      genres: this.form.value.genres,
      time: this.form.value.time,
      ageRestriction: this.form.value.ageRestriction,
      descriptionShort: this.form.value.descriptionShort,
      descriptionLong: this.form.value.descriptionLong,
      duration: this.form.value.duration,
      isPremiere: this.form.value.isPremiere,
    };
    this.movieService.add(movie)
  }
}
