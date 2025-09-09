// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  PieController,
} from 'chart.js';
import { BugService } from './services/bug.service';

// Register required chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
  PieController
);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  openResolvedData: any = {
    labels: [],
    datasets: [],
  };

  bugsByProjectData: any = {
    labels: [],
    datasets: [],
  };

  bugsByStatusData: any = {
    labels: [],
    datasets: [],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  constructor(private bugService: BugService) {}

  ngOnInit(): void {
    this.loadBugStats();
  }

  private loadBugStats(): void {
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.processChartData(bugs);
      },
      error: (error) => {
        console.error('Error loading bug stats:', error);
      },
    });
  }

  private processChartData(bugs: any[]): void {
    // Open vs Resolved data
    const open = bugs.filter((b) => b.status === 'Open').length;
    const resolved = bugs.filter((b) => b.status === 'Closed').length;

    this.openResolvedData = {
      labels: ['Open', 'Resolved'],
      datasets: [
        {
          data: [open, resolved],
          backgroundColor: ['#ffc107', '#28a745'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };

    // Bugs by Status data
    const bugsByStatus: { [status: string]: number } = {};
    bugs.forEach((bug) => {
      bugsByStatus[bug.status] = (bugsByStatus[bug.status] || 0) + 1;
    });

    this.bugsByStatusData = {
      labels: Object.keys(bugsByStatus),
      datasets: [
        {
          data: Object.values(bugsByStatus),
          backgroundColor: ['#dc3545', '#17a2b8', '#28a745'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };

    // Bugs by Project data
    const bugsByProject: { [project: string]: number } = {};
    bugs.forEach((bug) => {
      bugsByProject[bug.project] = (bugsByProject[bug.project] || 0) + 1;
    });

    this.bugsByProjectData = {
      labels: Object.keys(bugsByProject),
      datasets: [
        {
          label: 'Number of Bugs',
          data: Object.values(bugsByProject),
          backgroundColor: '#007bff',
          borderColor: '#0056b3',
          borderWidth: 1,
        },
      ],
    };
  }
}
