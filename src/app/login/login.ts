import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';

  loading = false;
  error: string | null = null;

  login() {
    this.loading = true;
    this.error = null;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/bugs']);
      },
      error: () => {
        this.error = 'Invalid username or password';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
