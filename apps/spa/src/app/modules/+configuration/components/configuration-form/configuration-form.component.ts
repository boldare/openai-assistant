import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThreadService } from '../../../+chat/shared/thread.service';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SpeechVoice } from '@boldare/assistant-ai';
import { ThreadConfig } from '../../../+chat/shared/chat.model';
import { ConfigurationFormService } from '../../shared/configuration-form.service';
import { ConfigurationFormValue } from '../../shared/configuration.model';
import { ThreadClientService } from '../../../+chat/shared/thread-client.service';

@Component({
  selector: 'ai-configuration-form',
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
  templateUrl: './configuration-form.component.html',
  styleUrl: './configuration-form.component.scss',
})
export class ConfigurationFormComponent {
  isLoading = false;
  form = this.configurationFormService.form;
  voices = [
    SpeechVoice.Alloy,
    SpeechVoice.Echo,
    SpeechVoice.Fable,
    SpeechVoice.Nova,
    SpeechVoice.Onyx,
    SpeechVoice.Shimmer,
  ];
  @Output() submit$ = new EventEmitter<ConfigurationFormValue>();

  constructor(
    private readonly threadService: ThreadService,
    private readonly threadClientService: ThreadClientService,
    private readonly configurationFormService: ConfigurationFormService,
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

    this.threadClientService
      .postThread(this.getInitialThreadMessages())
      .pipe(take(1))
      .subscribe(({ id }) => {
        this.threadService.saveId(id);
        this.isLoading = false;
        this.submit$.emit(this.form.value as ConfigurationFormValue);
      });
  }
}
