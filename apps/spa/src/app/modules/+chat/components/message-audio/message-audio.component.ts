import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatService } from '../../shared/chat.service';
import { MessageHistory } from '../../shared/chat.model';
import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { delay } from 'rxjs';

@Component({
  selector: 'ai-message-audio',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './message-audio.component.html',
  styleUrl: './message-audio.component.scss',
})
export class MessageAudioComponent {
  @ViewChild('audio') audio!: ElementRef;
  @Input() message!: MessageHistory;
  audioSource = '';
  isAudioEnabled = environment.isAudioEnabled;
  isStarted = false;

  constructor(
    private readonly chatService: ChatService,
    private domSanitizer: DomSanitizer,
  ) {}

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  speech() {
    if (this.isStarted) {
      return;
    }

    this.isStarted = true;

    if (this.audioSource) {
      this.audio.nativeElement.autoplay = true;
      return;
    }

    this.chatService
      .speech(this.message)
      .pipe(delay(100))
      .subscribe(response => {
        this.audioSource = `/assets/${response.filename}`;
        this.audio.nativeElement.load();
      });
  }

  onEnded() {
    this.isStarted = false;
    this.audio.nativeElement.autoplay = false;
  }

  pause() {
    this.audio.nativeElement.autoplay = false;
    this.audio.nativeElement.pause();
    this.isStarted = false;
  }
}
