import { Routes } from '@angular/router';
import { Login } from '../app/login/login';
import { Bugs } from '../app/bugs/bugs';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './unauthorized.component';
import { BugDetailComponent } from './bug-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bugs', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'bugs',
    component: Bugs,
    canActivate: [AuthGuard, RoleGuard('ADMIN')],
  },
  { path: 'bug-detail/:id', component: BugDetailComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'bugs' },
];
