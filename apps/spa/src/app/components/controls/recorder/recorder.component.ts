import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import * as RecordRTC from 'recordrtc';
import { ControlIconComponent } from '../control-icon/control-icon.component';
import { ControlItemComponent } from '../control-item/control-item.component';

@Component({
  selector: 'ai-recorder',
  standalone: true,
  imports: [ControlIconComponent, NgIf, NgClass, MatIcon, ControlItemComponent],
  templateUrl: './recorder.component.html',
  styleUrl: './recorder.component.scss',
})
export class RecorderComponent {
  @Output() send$ = new EventEmitter<Blob>();
  @Input() isDisabled = false;
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
    URL.revokeObjectURL(this.url);
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
