import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThreadService } from '../../shared/thread.service';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChatFormService } from '../../shared/chat-form.service';
import { ThreadConfig } from '../../shared/chat.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ai-chat-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.scss',
})
export class ChatFormComponent {
  isLoading = false;
  form = this.chatFormService.form;
  @Output() initMessage$ = new EventEmitter<string>();

  constructor(
    private readonly threadService: ThreadService,
    private readonly chatFormService: ChatFormService,
  ) {}

  getInitialThreadMessages(): ThreadConfig {
    return {
      messages: [
        {
          role: 'user',
          content: `Below you can find my details:
              * first name: ${this.form.controls.firstName.value || '-'}
            `,
        },
      ],
    };
  }

  startChat(): void {
    this.isLoading = true;

    this.threadService
      .postThread(this.getInitialThreadMessages())
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.threadService.saveThreadId(id);
        this.isLoading = false;
        this.initMessage$.emit('hello!');
      });
  }
}
