import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpeechVoice, ThreadConfig } from '@boldare/ai-assistant';
import { ConfigurationForm } from './configuration.model';
import { MessageStatus } from '../../+chat/shared/chat.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationFormService {
  form = new FormGroup<ConfigurationForm>({
    firstName: new FormControl(null),
    voice: new FormControl(SpeechVoice.Alloy, { nonNullable: true }),
  });

  getInitialThreadMessages(): ThreadConfig {
    return {
      messages: [
        {
          role: 'user',
          content: `Below you can find my details:
            * first name: ${this.form.controls.firstName.value || '-'}
          `,
          metadata: {
            status: MessageStatus.Invisible,
          },
        },
      ],
    };
  }
}
