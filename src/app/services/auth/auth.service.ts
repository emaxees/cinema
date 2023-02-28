import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user.type';

@Injectable()
export class AuthService {
    constructor() {}
    
    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return Boolean(token)
    }

    public setSession(user: User): void {
      const token = btoa(JSON.stringify(user))
      localStorage.setItem('token', token);
    }

    public getSessionInfo(): User | null {
      try {
        const token = localStorage.getItem('token') || '';
        const user = JSON.parse(atob(token))
        return user
      } catch {
        return null
      }
    }
}
