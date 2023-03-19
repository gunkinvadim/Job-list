import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobsListComponent } from './jobs-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: JobsListComponent }
    ]),
  ]
})
export class JobsListModule { }
