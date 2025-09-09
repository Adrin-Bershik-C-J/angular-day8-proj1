import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugService, Bug } from '../services/bug.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './bugs.html',
  styleUrls: ['./bugs.css'],
})
export class Bugs implements OnInit {
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  error: string | null = null;

  statuses = ['Open', 'In Progress', 'Closed'];
  priorities = ['High', 'Medium', 'Low'];

  selectedStatus: string = '';
  selectedPriority: string = '';

  constructor(
    private bugService: BugService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBugs();
  }

  newBug: Partial<Bug> = {
    title: '',
    status: 'Open',
    priority: 'Medium',
    assignee: '',
    project: '',
  };

  saveBug() {
    if (this.editingBugId) {
      // Update existing bug
      this.bugService.updateBug(this.editingBugId, this.newBug).subscribe({
        next: () => {
          this.loadBugs();
          this.resetForm();
        },
        error: (err) => (this.error = err.message || 'Failed to update bug'),
      });
    } else {
      // Create new bug
      this.bugService.createBug(this.newBug).subscribe({
        next: () => {
          this.loadBugs();
          this.resetForm();
        },
        error: (err) => (this.error = err.message || 'Failed to create bug'),
      });
    }
  }

  editBug(bug: Bug) {
    this.editingBugId = bug.id;
    this.newBug = { ...bug };
  }

  deleteBugById(id: number) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.bugService.deleteBug(id).subscribe({
        next: () => this.loadBugs(),
        error: (err) => (this.error = err.message || 'Failed to delete bug'),
      });
    }
  }

  resetForm() {
    this.editingBugId = null;
    this.newBug = {
      title: '',
      status: 'Open',
      priority: 'Medium',
      assignee: '',
      project: '',
    };
  }

  editingBugId: number | null = null;

  loadBugs() {
    this.bugService.getBugs().subscribe({
      next: (data) => {
        this.bugs = data;
        this.filteredBugs = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load bugs';
      },
    });
  }

  filterBugs() {
    const status = this.selectedStatus || undefined;
    const priority = this.selectedPriority || undefined;

    // Call backend filtering endpoint
    this.bugService.getFilteredBugs(status, priority).subscribe({
      next: (data) => {
        this.filteredBugs = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message || 'Failed to filter bugs';
      },
    });
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedPriority = '';
    this.loadBugs();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  statusClass(status: string) {
    return status?.toLowerCase().replace(/\s+/g, '-');
  }

  // Inside Bugs component
  viewBugDetails(id: number) {
    this.router.navigate(['/bug-detail', id]);
  }
}
