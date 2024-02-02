import { FormControl } from '@angular/forms';
import { SpeechVoice } from '@boldare/assistant-ai';

export interface ConfigurationForm {
  firstName: FormControl<string | null>;
  voice: FormControl<SpeechVoice>;
}

export interface ConfigurationFormValue {
  firstName: string | null;
  voice: SpeechVoice;
}
