import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as RecordRTC from 'recordrtc';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ai-chat-recorder',
  standalone: true,
  imports: [RouterLink, NgIf, NgClass],
  templateUrl: './chat-recorder.component.html',
  styleUrl: './chat-recorder.component.scss',
})
export class ChatRecorderComponent {
  @Output() send$ = new EventEmitter<Blob>();
  record: RecordRTC.StereoAudioRecorder | null = null;
  recording = false;
  url!: string;
  blob!: Blob;
  error!: string;

  initiateRecording() {
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream: unknown) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.record?.stop(this.processRecording.bind(this));
  }

  processRecording(blob: Blob) {
    this.url = URL.createObjectURL(blob);
    this.blob = blob;
    this.send$.emit(this.blob);

    this.url = '';
    this.record = null;
    this.recording = false;
  }

  errorCallback() {
    this.error = 'Can not play audio in your browser';
  }

  onRecord(): void {
    if (!this.recording) {
      this.initiateRecording();
      return;
    }

    this.stopRecording();
  }
}
