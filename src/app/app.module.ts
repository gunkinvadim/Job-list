import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobFormComponent } from './components/jobs-list/job-form/job-form.component';
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
      { path: "jobs", component: JobsListComponent },
      { path: "jobs/new", component: JobFormComponent },
      { path: "jobs/:id", component: JobFormComponent },
      { path: "",   redirectTo: "/jobs", pathMatch: "full" },
    ]),
    ReactiveFormsModule
  ],
  exports: [RouterModule, RouterLink],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
