import { ErrorService } from './components/error/error.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public errorService: ErrorService
  ) {}

  title = 'Job list';
}
