import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { AddMovieComponent } from './views/add-movie/add-movie.component';
import { GetTicketsComponent } from './views/get-tickets/get-tickets.component';
import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';
import { MoviesComponent } from './views/movies/movies.component';
import { MyTicketsComponent } from './views/my-tickets/my-tickets.component';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [SessionGuard]},
  {path: 'add-movie', component: AddMovieComponent, canActivate: [SessionGuard]},
  {path: 'movies', component: MoviesComponent, canActivate: [SessionGuard]},
  {path: 'my-tickets', component: MyTicketsComponent, canActivate: [SessionGuard]},
  {path: 'get-tickets/:id', component: GetTicketsComponent, canActivate: [SessionGuard]},
  { path: 'login', component: LoginComponent, canActivate: []},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
