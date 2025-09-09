import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BugService, Bug, Comment } from './services/bug.service';

@Component({
  selector: 'app-bug-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bug-detail.component.html',
  styleUrl: './bug-detail.component.css',
})
export class BugDetailComponent implements OnInit {
  bug?: Bug;
  newComment: string = '';

  constructor(private bugService: BugService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBug(id);
  }

  loadBug(id: number): void {
    this.bugService.getBugById(id).subscribe((bug) => {
      this.bug = bug;
      this.bug.comments = []; // Initialize as empty array for local comments
    });
  }

  addComment() {
    if (this.newComment.trim() && this.bug) {
      const comment: Comment = {
        author: 'Current User', // Replace with real username logic later
        message: this.newComment.trim(),
        createdAt: new Date().toISOString(),
      };

      this.bug.comments!.push(comment);
      this.newComment = '';
    }
  }
}
