import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { last, map, mergeAll, Observable, take, takeWhile, timer } from 'rxjs';
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

export interface Tab {
  id: number;
  name: string;
}

const counter = timer(0, 1000);

@Component({
  selector: 'app-get-tickets',
  templateUrl: './get-tickets.component.html',
  styleUrls: ['./get-tickets.component.scss']
})
export class GetTicketsComponent implements OnInit, OnDestroy {
  private sub: any;
  id: number = 0;
  movie$: Observable<Movie>;
  loading$: Observable<boolean>;
  showings$: Observable<Showing[]>;
  showing$: Observable<Showing>;
  tickets$: Observable<TicketType[]>
  form: FormGroup;
  tabs: Tab[] = [
    {
      id: 1,
      name: 'Movie Info, tickets and seats',
    },
    {
      id: 2,
      name: 'Resume',
    },
    {
      id: 3,
      name: 'Pay',
    },
  ];
  timeRemaining$ = timer(0, 1000).pipe(
    map(n => (600 - n) * 1000),
    takeWhile(n => n >= 0),
  );
  selectedTab: number = 1;
  ticketType: number = 0;
  seats: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    private showingsService: ShowingsService,
    private ticketTypeService: TicketTypesService,
    private fb: FormBuilder
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
    this.form = this.fb.group({
      email: ["", Validators.email],
      phone: ["", [Validators.required, Validators.maxLength(9)]],
      discountCode: ["", Validators.required],
      creditcardNumber: ["", [Validators.required, Validators.maxLength(9)]],
    });
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

  handleSelectionChage(seats: any) {
    this.seats = seats;
  }

  handleChage($event: any) {
    const id = $event.target.value;
    this.ticketType = Number(id);
  }

  handleClick() {
    this.selectedTab = 2;
  }

  onSubmit() {
    this.selectedTab = 3;
  }

  onSubmitCreditCard() {
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=testingworkflow`)
  }
}
