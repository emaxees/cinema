import { Directive, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../types/user.type';

@Directive({
  selector: '[app-privilege]'
})
export class PrivilegeDirective {

  @Input('role') role: string = '';

  constructor(private auth: AuthService, private el: ElementRef, private router: Router) {
    router.events.subscribe(() => {
      this.checkPrivileges();
    });
  }

  ngOnInit() {
    this.checkPrivileges();
  }

  checkPrivileges() {
    const user: User | null = this.auth.getSessionInfo();
    if (!user) this.el.nativeElement.style.display = 'none';
    else {
      if (user?.role === this.role) this.el.nativeElement.style.visibility = 'visible';
      else this.el.nativeElement.style.visibility = 'hidden';
    }
  }
}