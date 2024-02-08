import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[aiFiles]',
})
export class AiFilesDirective {
  @Output() drop$: EventEmitter<FileList> = new EventEmitter();
  @Input() files: File[] = [];
  event = 'init';

  @HostBinding('class') get getClasses(): string {
    return `drag-drop--${this.event} ${
      this.files.length ? 'has-files' : 'no-files'
    }`;
  }

  @HostListener('dragover', ['$event']) public onDragOver(
    event: DragEvent,
  ): void {
    event.preventDefault();
    event.stopPropagation();
    this.event = 'dragleave';
  }

  @HostListener('drag', ['$event']) public onDragEnd(event: DragEvent): void {
    this.initEvent(event);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(
    event: DragEvent,
  ): void {
    this.initEvent(event);
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent): void {
    this.initEvent(event);
    const files = event.dataTransfer?.files;

    if (!files) {
      return;
    }

    this.drop$.emit(files);
  }

  initEvent(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.event = 'init';
  }
}
