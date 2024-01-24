import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatConfigForm, SpeechVoice } from './chat.model';

@Injectable({ providedIn: 'root' })
export class ChatFormService {
  form = new FormGroup<ChatConfigForm>({
    firstName: new FormControl(null),
    voice: new FormControl(SpeechVoice.alloy, { nonNullable: true }),
  });
}
