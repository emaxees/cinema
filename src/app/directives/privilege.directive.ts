import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../types/user.type';

@Directive({
  selector: '[app-privilege]'
})
export class PrivilegeDirective implements OnInit {

  @Input('role') role: string = '';

  constructor(private auth: AuthService, private el: ElementRef, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('holaaa')
        this.checkPrivileges();
      }
    });
  }

  checkPrivileges() {
    const user: User | null = this.auth.getSessionInfo();
    if (!user) this.el.nativeElement.style.display = 'none';
    else {
      if (user?.role === this.role) this.el.nativeElement.style.display = 'flex';
      else this.el.nativeElement.style.display = 'none';
    }
  }
}