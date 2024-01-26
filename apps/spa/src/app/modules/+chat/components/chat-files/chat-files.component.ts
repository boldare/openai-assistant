import { Component, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AiDragNDropDirective } from './drag-n-drop.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilesService } from '../../shared/files.service';

@Component({
  selector: 'ai-chat-files',
  standalone: true,
  imports: [MatIcon, AiDragNDropDirective],
  templateUrl: './chat-files.component.html',
  styleUrl: './chat-files.component.scss',
})
export class ChatFilesComponent {
  @ViewChild('input') input!: HTMLInputElement;
  files = toSignal(this.fileService.files$, { initialValue: [] });

  constructor(private readonly fileService: FilesService) {}

  addFiles(files: FileList){
    this.fileService.add(files);
  }

  onFileChange(event: Event){
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files as FileList);
  }

  clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.input.files = null;
    this.fileService.clear();
  }
}
