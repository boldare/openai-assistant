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
      `./apps/spa/src/assets/${filename}`,
      Buffer.from(arraybuffer),
    );

    return { content, filename };
  }

  // async speech(input: string): Promise<ArrayBuffer> {
  //   const { data } = await firstValueFrom(
  //     this.http.post<ArrayBuffer>(
  //       `https://api.openai.com/v1/audio/speech`,
  //       {
  //         model: 'tts-1',
  //         voice: 'alloy',
  //         input,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env['OPENAI_API_KEY']}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     ),
  //   );
  //
  //   return data;
  // }
}
