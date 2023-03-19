import { ErrorService } from '../error/error.service';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toCamel, toSnake } from 'snake-camel';
import { Job } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) { }

  mode: "ADD" | "EDIT";
  itemId: number;
  itemData: Job;

  formGroup: FormGroup;
  isLoading: boolean;
  isSending: boolean;

   ngOnInit(): void {
    this.initFormGroup()

    this.route.params.subscribe(async params => {
      if (params["id"]) {
        this.mode = "EDIT";
        this.itemId = params["id"];
        await this.getItemData();
      } else {
        this.mode = "ADD"
      }
    })
  }

  async getItemData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.http.get(environment.baseURL + `/jobs/${this.itemId}`)
        .subscribe({
          next: async res => {
            this.itemData = toCamel(res) as Job;
            let values = { ...this.itemData };
            delete values.id;
            this.formGroup.setValue(values);
            this.isLoading = false
            resolve();
          },
          error: (err) => {
            this.errorService.showError(err.message);
            reject();
          }
        })
      })
  }

  initFormGroup() {
    this.formGroup = this.fb.group({
      jobNumber: [ "", Validators.required ],
      jobTitle: [ "", Validators.required ],
      jobStartDate: [ null, Validators.required ],
      jobCloseDate: [ null, Validators.required ],
      experienceRequired: false,
      numberOfOpenings: [ null, Validators.required ],
      jobNotes: ""
    })
  }

  async submitForm() {
    this.isLoading = true;

    if (this.mode == "ADD") {
      this.http.post(environment.baseURL + "/jobs", toSnake(this.formGroup.value))
        .subscribe({
          next: res => {
            this.isLoading = false;
            this.router.navigate(["/jobs"]);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorService.showError(err.message);
          }
        })
    } else {
      this.http.put(environment.baseURL + `/jobs/${this.itemId}`, toSnake(this.formGroup.value))
        .subscribe({
          next: res => {
            this.isLoading = false;
            this.router.navigate(["/jobs"]);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorService.showError(err.message);
          }
        })
    }
  }

  cancelForm() {
    this.router.navigate(["/jobs"]);
  }
}
