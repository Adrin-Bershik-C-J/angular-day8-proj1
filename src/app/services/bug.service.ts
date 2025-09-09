import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface Bug {
  id: number;
  title: string;
  status: 'Open' | 'In Progress' | 'Closed';
  assignee: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low';
  comments?: Comment[];
}

export interface Comment {
  id?: number;
  author: string;
  message: string;
  createdAt?: string;
}

export interface BugStats {
  openVsResolved: { open: number; resolved: number };
  bugsByProject: { [project: string]: number };
  bugsByStatus: { [status: string]: number };
}

@Injectable({ providedIn: 'root' })
export class BugService {
  // Use the search endpoint — calling it without params returns all bugs
  private apiUrl = 'http://localhost:8080/api/bugs/search';

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error('Error fetching bugs:', err);
        return throwError(() => new Error('Failed to load bugs'));
      })
    );
  }

  getFilteredBugs(status?: string, priority?: string): Observable<Bug[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);

    return this.http.get<Bug[]>(this.apiUrl, { params }).pipe(
      catchError((err) => {
        console.error('Error fetching filtered bugs:', err);
        return throwError(() => new Error('Failed to load filtered bugs'));
      })
    );
  }

  createBug(bug: Partial<Bug>): Observable<Bug> {
    return this.http
      .post<Bug>('http://localhost:8080/api/bugs/admin/create', bug)
      .pipe(
        catchError((err) => {
          console.error('Error creating bug:', err);
          return throwError(() => new Error('Failed to create bug'));
        })
      );
  }

  updateBug(id: number, bug: Partial<Bug>): Observable<Bug> {
    return this.http
      .put<Bug>(`http://localhost:8080/api/bugs/admin/update/${id}`, bug)
      .pipe(
        catchError((err) => {
          console.error('Error updating bug:', err);
          return throwError(() => new Error('Failed to update bug'));
        })
      );
  }

  deleteBug(id: number): Observable<Bug> {
    return this.http
      .delete<Bug>(`http://localhost:8080/api/bugs/admin/delete?id=${id}`)
      .pipe(
        catchError((err) => {
          console.error('Error deleting bug:', err);
          return throwError(() => new Error('Failed to delete bug'));
        })
      );
  }

  // addComment(id: number, comment: Comment): Observable<Comment> {
  //   return this.http.post<Comment>(`${this.apiUrl}/${id}/comments`, comment);
  // }

  getBugById(id: number): Observable<Bug> {
    return this.http.get<Bug>(`http://localhost:8080/api/bugs/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching bug by id:', err);
        return throwError(() => new Error('Failed to load bug details'));
      })
    );
  }

  addComment(id: number, comment: Comment): Observable<Comment> {
    return this.http
      .post<Comment>(`http://localhost:8080/api/bugs/${id}/comments`, comment)
      .pipe(
        catchError((err) => {
          console.error('Error adding comment:', err);
          return throwError(() => new Error('Failed to add comment'));
        })
      );
  }
  getBugStats(): Observable<BugStats> {
    return this.http.get<BugStats>(`${this.apiUrl}/stats`);
  }
}
