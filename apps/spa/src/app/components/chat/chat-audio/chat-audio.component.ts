import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { delay } from 'rxjs';
import { ChatAudioResponse, PostSpeechDto } from '@boldare/openai-assistant';
import { NgClass } from '@angular/common';
import { getMessageText } from '../../controls/message-content/message-content.helpers';
import { ChatClientService } from '../../../modules/+chat/shared/chat-client.service';
import {
  ChatMessage,
  SpeechVoice,
} from '../../../modules/+chat/shared/chat.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ai-chat-audio',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './chat-audio.component.html',
  styleUrl: './chat-audio.component.scss',
})
export class ChatAudioComponent implements OnInit {
  @Input() message!: ChatMessage;
  isStarted = false;
  audio = new Audio();

  get getMessageText(): string {
    if (!environment.isAudioEnabled || !this.message) {
      return '';
    }

    return getMessageText(this.message);
  }

  constructor(private readonly chatService: ChatClientService) {}

  ngOnInit(): void {
    this.audio.onended = this.onEnded.bind(this);
  }

  audioDataToBlob(audioData: number[]): Blob {
    const byteArray = new Uint8Array(audioData);
    return new Blob([byteArray], { type: 'audio/wav' });
  }

  handleAudioData(response: ChatAudioResponse): void {
    const blob = this.audioDataToBlob(response.data);

    this.audio.src = URL.createObjectURL(blob);
    this.play();
  }

  speech(): void {
    if (!this.getMessageText) {
      return;
    }

    this.isStarted = true;

    if (this.audio.src) {
      this.play();
      return;
    }

    const payload: PostSpeechDto = {
      content: getMessageText(this.message),
      voice: SpeechVoice.Onyx,
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
