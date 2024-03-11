import { FormControl } from '@angular/forms';
import { SpeechVoice } from '../../+chat/shared/chat.model';

export interface ConfigurationForm {
  firstName: FormControl<string | null>;
  voice: FormControl<SpeechVoice>;
}

export interface ConfigurationFormValue {
  firstName: string | null;
  voice: SpeechVoice;
}
