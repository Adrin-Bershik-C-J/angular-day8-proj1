import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: '<h1 style="color:red;text-align:center">Unauthorized</h1>',
  imports: [CommonModule],
})
export class UnauthorizedComponent {}
