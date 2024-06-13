import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Annotation } from 'openai/resources/beta/threads';
import { ChatClientService } from '../../../modules/+chat/shared/chat-client.service';
import { FileObject } from 'openai/resources';
import { isFileCitation } from '../../../pipes/annotation.pipe';
import { take } from 'rxjs';

@Component({
  selector: 'ai-chat-annotation',
  standalone: true,
  templateUrl: './chat-annotation.component.html',
  styleUrl: './chat-annotation.component.scss',
  imports: [MatTooltip],
})
export class ChatAnnotationComponent {
  @Input() annotation!: Annotation;
  @Input() index = 1;
  fileDetails!: FileObject;

  get fileId(): string {
    return isFileCitation(this.annotation)
      ? this.annotation.file_citation.file_id
      : this.annotation.file_path.file_id;
  }

  constructor(private chatClientService: ChatClientService) {}

  showDetails() {
    if (!this.fileId || !!this.fileDetails) {
      return;
    }

    this.chatClientService
      .retriveFile(this.fileId)
      .pipe(take(1))
      .subscribe(details => (this.fileDetails = details));
  }
}
