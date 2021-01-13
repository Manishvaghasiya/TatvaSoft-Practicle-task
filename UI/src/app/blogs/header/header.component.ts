import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.userAccount().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        // do something with error
      }
    );
  }

  logOut() {
    this.userService.logout().subscribe(
      () => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      (error) => {
        // do something with error
      }
    );
  }
}
