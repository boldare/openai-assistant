import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SpeechVoice } from '@boldare/assistant-ai';
import { ConfigurationForm } from './configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationFormService {
  form = new FormGroup<ConfigurationForm>({
    firstName: new FormControl(null),
    voice: new FormControl(SpeechVoice.Alloy, { nonNullable: true }),
  });
}
