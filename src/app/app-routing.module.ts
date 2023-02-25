import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guards/session.guard';
import { AddMovieComponent } from './views/add-movie/add-movie.component';
import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [SessionGuard]},
  {path: 'add-movie', component: AddMovieComponent, canActivate: [SessionGuard]},
  { path: 'login', component: LoginComponent, canActivate: []},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
