import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import { Transcription } from 'openai/resources/audio';
import { SpeechResponse } from '../assistant';

@Injectable()
export class AiService {
  provider = new OpenAI();

  async transcription(file: fs.ReadStream): Promise<Transcription> {
    return this.provider.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    });
  }

  async speech(content: string): Promise<SpeechResponse> {
    const response = await this.provider.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: content,
    });

    const arraybuffer = await response.arrayBuffer();
    const filename = `audio-${new Date().toJSON()}.wav`;

    fs.appendFileSync(
      `${process.env['AUDIO_UPLOAD_PATH']}/${filename}`,
      Buffer.from(arraybuffer),
    );

    return { content, filename };
  }
}
