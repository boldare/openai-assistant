import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { ChatSpeech, MessageHistory, SpeechVoice } from '../../shared/chat.model';
import { environment } from '../../../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { delay } from 'rxjs';
import { SpeechPayload } from '@boldare/assistant-ai';
import { ChatFormService } from '../../shared/chat-form.service';

@Component({
  selector: 'ai-message-audio',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './message-audio.component.html',
  styleUrl: './message-audio.component.scss',
})
export class MessageAudioComponent implements OnInit {
  @Input() message!: MessageHistory;
  form = this.chatFormService.form;
  isAudioEnabled = environment.isAudioEnabled;
  isStarted = false;
  audio = new Audio();

  constructor(
    private readonly chatService: ChatService,
    private readonly chatFormService: ChatFormService,
  ) {}

  ngOnInit(): void {
    this.audio.onended = this.onEnded.bind(this);
  }

  audioDataToBlob(audioData: number[]): Blob {
    const byteArray = new Uint8Array(audioData);
    return new Blob([byteArray], { type: 'audio/wav' });
  }

  handleAudioData(response: ChatSpeech): void {
    const blob = this.audioDataToBlob(response.data);

    this.audio.src = URL.createObjectURL(blob);
    this.play();
  }

  speech(): void {
    this.isStarted = true;

    if (this.audio.src) {
      this.play();
      return;
    }

    const payload: SpeechPayload = {
      content: this.message.content,
      voice: this.form.controls.voice.value as SpeechVoice
    };

    this.chatService
      .speech(payload)
      .pipe(delay(100))
      .subscribe(response => this.handleAudioData(response));
  }

  play(): void {
    this.audio.play().catch(e => console.error('Error playing audio:', e));
  }

  onEnded(): void {
    this.isStarted = false;
  }

  pause(): void {
    this.audio.pause();
    this.isStarted = false;
  }
}
