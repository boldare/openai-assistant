import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ai-control-item',
  standalone: true,
  templateUrl: './control-item.component.html',
  styleUrl: './control-item.component.scss',
})
export class ControlItemComponent {
  @HostBinding('class.is-disabled') @Input() isDisabled = false;
}
