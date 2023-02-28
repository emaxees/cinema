import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from "@angular/forms";
import { User } from 'src/app/types/user.type';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$: Observable<boolean>;
  users$: Observable<User[]>;
  error: boolean = false;

  inputForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private userSerice: UserService, 
    public authService: AuthService,
    public router: Router
  ) {
    this.users$ = userSerice.entities$;
    this.loading$ = userSerice.loading$;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userSerice.getAll();
  }

  onSubmit() {
    const {email, password} =  this.inputForm.value;
    this.users$.pipe(
      map(users => users.filter(user => user.email === email && user.password == password )),
    ).subscribe((results) => {
      const [user] = results;
      if (user) {
        this.authService.setSession(user);
        this.router.navigate([''])
      }
      else this.error = true;
    });
  }
}
