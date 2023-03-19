import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePopupComponent } from './components/jobs-list/delete-popup/delete-popup.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsListComponent,
    JobFormComponent,
    DeletePopupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "jobs", loadChildren: () => import('./components/jobs-list/jobs-list.module').then(m => m.JobsListModule) },
      { path: "jobs/new", loadChildren: () => import('./components/job-form/job-form.module').then(m => m.JobFormModule) },
      { path: "jobs/:id", loadChildren: () => import('./components/job-form/job-form.module').then(m => m.JobFormModule) },
      { path: "",   redirectTo: "/jobs", pathMatch: "full" },
    ]),
    ReactiveFormsModule
  ],
  exports: [RouterModule, RouterLink],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
