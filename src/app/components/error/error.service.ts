import { Injectable } from '@angular/core';
import { delayTimeout } from 'src/app/functions/delayTimeout';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }

  public hasError: boolean = false;
  public errorMessage: string | null;

  public async showError(message: string) {
    this.hasError = true;
    this.errorMessage = message;

    await delayTimeout(5000);

    this.closeError();
  }

  public closeError() {
    this.hasError = false;
    this.errorMessage = null;
  }
}
