import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ai-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  @HostBinding('class.is-active') @Input() isActive = false;
}
