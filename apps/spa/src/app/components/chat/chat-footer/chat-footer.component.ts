import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardFooterComponent } from '../../cards';
import { ControlsComponent, FilesComponent, InputComponent, RecorderComponent } from '../../controls';

@Component({
  selector: 'ai-chat-footer',
  standalone: true,
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss',
  imports: [
    ControlsComponent,
    CardFooterComponent,
    InputComponent,
    RecorderComponent,
    FilesComponent,
  ],
})
export class ChatFooterComponent {
  @Output() sendAudio$ = new EventEmitter<Blob>();
  @Output() sendMessage$ = new EventEmitter<string>();
  @Input() isDisabled = false;
  @Input() isTranscriptionEnabled = false;
  @Input() isAttachmentEnabled = false;
}
