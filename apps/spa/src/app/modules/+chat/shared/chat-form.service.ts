import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatConfigForm } from './chat.model';
import { SpeechVoice } from '@boldare/assistant-ai';

@Injectable({ providedIn: 'root' })
export class ChatFormService {
  form = new FormGroup<ChatConfigForm>({
    firstName: new FormControl(null),
    voice: new FormControl(SpeechVoice.Alloy, { nonNullable: true }),
  });
}
