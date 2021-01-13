import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClientService) {}

  createUser(user) {
    return this.httpClient.post('users', user);
  }

  loginUser(user) {
    return this.httpClient.post('users/login', user);
  }

  userAccount() {
    return this.httpClient.get('users/me');
  }

  getUser() {
    return this.httpClient.get('users');
  }

  updateUser(user) {
    return this.httpClient.patch('users/me', user);
  }

  deleteUser() {
    return this.httpClient.delete('users/me');
  }

  logout() {
    return this.httpClient.post('users/logout');
  }

  logoutAll() {
    return this.httpClient.post('users/logoutAll');
  }
}
