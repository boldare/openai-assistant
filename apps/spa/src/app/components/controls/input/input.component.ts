import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ai-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class InputComponent {
  @Input() isDisabled = false;
  @Output() send$ = new EventEmitter<string>();
  content = '';

  send(content: string): void {
    if (!content?.trim()) {
      return;
    }

    this.send$.emit(content);
    this.content = '';
  }
}
