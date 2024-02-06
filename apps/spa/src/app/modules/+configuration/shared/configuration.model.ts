import { FormControl } from '@angular/forms';
import { SpeechVoice } from '@boldare/ai-assistant';

export interface ConfigurationForm {
  firstName: FormControl<string | null>;
  voice: FormControl<SpeechVoice>;
}

export interface ConfigurationFormValue {
  firstName: string | null;
  voice: SpeechVoice;
}
