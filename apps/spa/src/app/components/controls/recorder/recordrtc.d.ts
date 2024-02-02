declare module 'recordrtc' {
  export class StereoAudioRecorder {
    constructor(stream: unknown, options: unknown);
    record(): void;
    stop(callback: (blob: Blob) => void): void;
  }
}
