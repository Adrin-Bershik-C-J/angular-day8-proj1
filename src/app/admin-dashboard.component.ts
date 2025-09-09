// import { Component, OnInit } from '@angular/core';
// import { BugService, BugStats } from './services/bug.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   imports: [],
//   templateUrl: './admin-dashboard.component.html',
// })
// export class AdminDashboardComponent implements OnInit {
//   stats?: BugStats;
//   //chart
//   openResolvedData: any;
//   bugsByProjectData: any;
//   bugsByStatsData: any;

//   constructor(private bugService: BugService) {}

//   ngOnInit(): void {
//     this.bugService.getBugStats().subscribe((stats) => {
//       this.stats = stats;
//       this.openResolvedData = {
//         labels: ['Open', 'Resolved'],
//         datasets: [{ data: stats.openVsResolved.open,stats.openVsResolved.resolved }],
//         backgroundColor:['#fccf03','#66bb6a']
//       };
//       this.bugsByStatsData={
//         labels:Object.keys(stats.bugsByStatus),
//         datasets:[{data:Object.values(stats.bugsByStatus), backgroundColor:['#f44336','#4caf50']}]
//       }
//     });
//   }
// }
