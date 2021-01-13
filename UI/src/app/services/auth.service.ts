import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authtoken = 'authtoken';

  constructor() {}

  setAuthToken(token: string) {
    sessionStorage.setItem(this.authtoken, token);
  }

  getAuthToken() {
    return sessionStorage.getItem(this.authtoken) || null;
  }
}
