import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlItemComponent } from '../control-item/control-item.component';
import { ControlIconComponent } from '../control-icon/control-icon.component';
import { AiFilesDirective } from '../files/files.directive';
import { MessageContentService } from './message-content.service';

@Component({
  selector: 'ai-message-content',
  standalone: true,
  imports: [
    MatIcon,
    AiFilesDirective,
    ControlItemComponent,
    ControlIconComponent,
  ],
  templateUrl: './message-content.component.html',
  styleUrl: './message-content.component.scss',
})
export class MessageContentComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Input() isDisabled = false;
  imageContentList$ = toSignal(this.messageContentService.data$, {
    initialValue: [],
  });

  constructor(private readonly messageContentService: MessageContentService) {}

  addFiles(files: FileList) {
    this.messageContentService.add(files);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files as FileList);
  }

  clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.input.nativeElement.files = null;
    this.input.nativeElement.value = '';
    this.messageContentService.clear();
  }
}
