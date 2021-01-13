import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.userService.loginUser(loginModel).subscribe(
      (response: any) => {
        this.authService.setAuthToken(response.token);
        this.loginForm.reset();
        // redirect to blogs
        this.router.navigate(['/blogs']);
      },
      (error) => {
        this.router.navigate(['/signup']);
      }
    );
  }
}
