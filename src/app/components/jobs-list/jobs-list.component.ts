import { ErrorService } from './../error/error.service';
import { Router } from '@angular/router';
import { environment } from './../../environment/environment';
import { Job } from './../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delayTimeout } from '../../functions/delayTimeout';
import { toCamel } from 'snake-camel';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorService: ErrorService
  ) { }

  isLoading: boolean;
  jobsList: Job[];

  deletingItem: Job | null;

  async ngOnInit(): Promise<void> {
    await this.getJobItems();
  }

  async getJobItems() {
    new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      this.http.get<Job[]>(environment.baseURL + "/jobs")
        .subscribe({
          next: res => {
            this.jobsList = (res.map(toCamel) as Job[]);
            this.isLoading = false;
            resolve();
          },
          error: err => {
            this.errorService.showError(err.message);
            reject();
          }})
      })
  }

  onItemClick(item: Job) {
    this.router.navigate([`/jobs/${item.id}`]);
  }

  deleteItem(e: MouseEvent, item: Job) {
    e.stopPropagation()
    this.deletingItem = item;
  }
}

