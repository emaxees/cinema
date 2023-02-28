import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, last, map, mergeAll, Observable, take, takeWhile, timer } from 'rxjs';
import { MovieService } from 'src/app/services/movies/movies.service';
import { ShowingsService } from 'src/app/services/showings/showings-service.service';
import { TicketTypesService } from 'src/app/services/ticket-types/ticket-types.service';
import { Movie } from 'src/app/types/movie.type';
import { Showing } from 'src/app/types/showing.type';
import { TicketType } from 'src/app/types/ticket-type';

export interface Seat {
  id: number;
  number: string;
  row: string;
  selected: boolean;
  reserved: boolean;
}

export interface Row {
  id: number;
  name: string;
  seats: Seat[];
}

const counter = timer(0, 1000);

@Component({
  selector: 'app-get-tickets',
  templateUrl: './get-tickets.component.html',
  styleUrls: ['./get-tickets.component.scss']
})
export class GetTicketsComponent implements OnInit, OnDestroy {
  id: number = 0;
  movie$: Observable<Movie>;
  loading$: Observable<boolean>;
  showings$: Observable<Showing[]>;
  showing$: Observable<Showing>;
  tickets$: Observable<TicketType[]>
  timeRemaining$ = timer(0, 1000).pipe(
    map(n => (600 - n) * 1000),
    takeWhile(n => n >= 0),
  );
  
  private sub: any;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private showingsService: ShowingsService,
    private ticketTypeService: TicketTypesService,
  ) {
    this.movie$ = movieService.entities$.pipe(mergeAll(), take(1), last());
    this.showings$ = showingsService.entities$;
    this.loading$ = movieService.loading$;
    this.tickets$ =  ticketTypeService.getAll();
    this.showing$ = showingsService.entities$.pipe(
      map(showings => showings.filter(showing => showing.movieId == this.id )),
      mergeAll(), 
      take(1), 
      last()
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.movieService.getWithQuery({id: this.id})
      this.showingsService.getAll();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleSelectionChage($event: string[]) {
    console.log($event);
  }
}
