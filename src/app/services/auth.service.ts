import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private _currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  /** Login and store token + user info */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.jwt);
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this._currentUser = res.user;
        }
      }),
      catchError((err) => {
        console.error('Login failed:', err);
        return throwError(() => new Error('Login request failed'));
      })
    );
  }

  /** Logout and clear storage */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser = null;
  }

  /** Get token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Load user from localStorage */
  private loadUserFromStorage() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this._currentUser = JSON.parse(userJson);
    }
  }

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Get current user */
  get currentUser(): User | null {
    return this._currentUser;
  }

  /** Get user role from stored user or token */
  getUserRole(): string | null {
    if (this._currentUser?.role) return this._currentUser.role;

    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  /** Check if user has specific role */
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }
}
