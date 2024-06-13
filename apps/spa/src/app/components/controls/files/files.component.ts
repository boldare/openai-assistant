import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AiFilesDirective } from './files.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { FilesService } from './files.service';
import { ControlItemComponent } from '../control-item/control-item.component';
import { ControlIconComponent } from '../control-icon/control-icon.component';

@Component({
  selector: 'ai-files',
  standalone: true,
  imports: [
    MatIcon,
    AiFilesDirective,
    ControlItemComponent,
    ControlIconComponent,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @Input() isDisabled = false;
  files = toSignal(this.fileService.files$, { initialValue: [] });

  constructor(private readonly fileService: FilesService) {}

  addFiles(files: FileList) {
    this.fileService.add(files);
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
    this.fileService.clear();
  }
}
