import { ErrorService } from './../../error/error.service';
import { HttpClient } from '@angular/common/http';
import { Job } from 'src/app/interfaces/interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toCamel } from 'snake-camel';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  @Input() jobItem: Job;
  @Output() getJobItems = new EventEmitter()
  @Output() closePopup = new EventEmitter();

  isLoading: boolean;

  async deleteItem() {
    this.isLoading = true;

    this.http.delete(environment.baseURL + `/jobs/${this.jobItem.id}`)
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.getJobItems.emit();
          this.closePopup.emit();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorService.showError(err.message);
        }
      })
  }
}
