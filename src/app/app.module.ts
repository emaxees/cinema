import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { IndexComponent } from './views/index/index.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { AuthService } from './services/auth/auth.service';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './views/add-movie/add-movie.component';
import { MoviesComponent } from './views/movies/movies.component';
import { MyTicketsComponent } from './views/my-tickets/my-tickets.component';
import { GetTicketsComponent } from './views/get-tickets/get-tickets.component';
import { SeatComponent } from './components/seat/seat.component';
import { RangePipe } from './pipes/range-pipe.pipe';
import { PrivilegeDirective } from './directives/privilege.directive';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://cinema-json-server.herokuapp.com/',
  timeout: 6000,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    LeftSidebarComponent,
    AddMovieComponent,
    MoviesComponent,
    MyTicketsComponent,
    GetTicketsComponent,
    SeatComponent,
    RangePipe,
    PrivilegeDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: true}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [AuthService, { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },],
  bootstrap: [AppComponent]
})
export class AppModule { }
