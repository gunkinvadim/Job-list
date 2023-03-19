import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(
    public errorService: ErrorService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.currentTarget !== this.errorPopup.nativeElement) {
          this.errorService.closeError();
      }
    });
  }

  @ViewChild('errorPopup') errorPopup: ElementRef;

  ngOnInit(): void {
  }
}
