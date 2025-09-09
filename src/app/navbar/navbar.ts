// src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" *ngIf="isLoggedIn">
      <div class="navbar-container">
        <!-- Brand/Logo -->
        <div class="navbar-brand">
          <h2>Bug Tracker</h2>
        </div>

        <!-- Navigation Links -->
        <div class="navbar-menu" [class.active]="isMenuOpen">
          <div class="navbar-nav">
            <a
              routerLink="/bugs"
              routerLinkActive="active"
              class="nav-link"
              (click)="closeMenu()"
            >
              <i class="icon-bugs"></i>
              Bugs
            </a>

            <a
              routerLink="/dashboard"
              routerLinkActive="active"
              class="nav-link"
              *ngIf="userRole === 'ADMIN'"
              (click)="closeMenu()"
            >
              <i class="icon-dashboard"></i>
              Dashboard
            </a>
          </div>

          <!-- User Actions -->
          <div class="navbar-actions">
            <div class="user-info">
              <span class="username">{{ username }}</span>
              <span class="role-badge" [class]="userRole?.toLowerCase()">
                {{ userRole }}
              </span>
            </div>

            <button class="logout-btn" (click)="onLogout()">
              <i class="icon-logout"></i>
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-toggle"
          (click)="toggleMenu()"
          [class.active]="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
      }

      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        min-height: 60px;
      }

      .navbar-brand h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
      }

      .navbar-menu {
        display: flex;
        align-items: center;
        gap: 40px;
        flex: 1;
        justify-content: space-between;
        margin-left: 40px;
      }

      .navbar-nav {
        display: flex;
        align-items: center;
        gap: 30px;
      }

      .nav-link {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        transform: translateY(-1px);
      }

      .nav-link.active {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .navbar-actions {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .username {
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }

      .role-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .role-badge.admin {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.3);
      }

      .role-badge.user {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
        border: 1px solid rgba(40, 167, 69, 0.3);
      }

      .logout-btn {
        background: rgba(220, 53, 69, 0.2);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.3);
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .logout-btn:hover {
        background: rgba(220, 53, 69, 0.3);
        transform: translateY(-1px);
      }

      .mobile-toggle {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        width: 30px;
        height: 30px;
      }

      .mobile-toggle span {
        display: block;
        height: 3px;
        width: 100%;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;
        margin: 3px 0;
      }

      .mobile-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }

      .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .mobile-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }

      /* Icons using CSS (you can replace with actual icon library) */
      .icon-bugs::before {
        content: '🐛';
        margin-right: 4px;
      }

      .icon-dashboard::before {
        content: '📊';
        margin-right: 4px;
      }

      .icon-logout::before {
        content: '🚪';
        margin-right: 4px;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .navbar-container {
          padding: 0 15px;
        }

        .navbar-brand h2 {
          font-size: 1.25rem;
        }

        .mobile-toggle {
          display: flex;
        }

        .navbar-menu {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          flex-direction: column;
          padding: 20px;
          gap: 20px;
          transform: translateY(-100%);
          opacity: 0;
          transition: all 0.3s ease;
          margin-left: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-menu.active {
          transform: translateY(0);
          opacity: 1;
        }

        .navbar-nav {
          flex-direction: column;
          width: 100%;
          gap: 15px;
        }

        .nav-link {
          width: 100%;
          text-align: center;
          padding: 12px 20px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-actions {
          flex-direction: column;
          width: 100%;
          gap: 15px;
        }

        .user-info {
          justify-content: center;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          width: 100%;
        }

        .logout-btn {
          width: 100%;
          justify-content: center;
          padding: 12px 20px;
        }
      }

      @media (max-width: 480px) {
        .navbar-container {
          padding: 0 10px;
        }

        .navbar-brand h2 {
          font-size: 1.1rem;
        }

        .user-info {
          flex-direction: column;
          gap: 8px;
        }
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;
  username = '';
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateAuthState();

    // Listen for route changes to update auth state
    this.router.events.subscribe(() => {
      this.updateAuthState();
    });
  }

  private updateAuthState(): void {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
    this.userRole = this.authService.getUserRole();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.username = payload.sub || payload.username || 'User';
      } catch {
        this.username = 'User';
      }
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
    this.username = '';
    this.isMenuOpen = false;
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
