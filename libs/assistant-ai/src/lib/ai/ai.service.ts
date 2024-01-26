import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import { Transcription } from 'openai/resources/audio';
import { toFile, Uploadable } from 'openai/uploads';
import { SpeechPayload } from '../assistant';
import { FileObject } from 'openai/resources';
// @ts-ignore
import { multer } from 'multer';

@Injectable()
export class AiService {
  provider = new OpenAI();

  async transcription(file: Uploadable): Promise<Transcription> {
    return this.provider.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    });
  }

  async saveFile(arraybuffer: ArrayBuffer): Promise<{ filename: string }> {
    const filename = `audio-${new Date().toJSON()}.wav`;

    fs.appendFileSync(
      `${process.env['AUDIO_UPLOAD_PATH']}/${filename}`,
      Buffer.from(arraybuffer),
    );

    return { filename };
  }

  async speech(data: SpeechPayload): Promise<Buffer> {
    const response = await this.provider.audio.speech.create({
      model: 'tts-1',
      voice: data.voice || 'alloy',
      input: data.content,
    });

    return Buffer.from(await response.arrayBuffer());
  }

  async files(files: Express.Multer.File[]): Promise<FileObject[]> {
    return await Promise.all(
      files.map(async file => {
        return this.provider.files.create({
          file: await toFile(file.buffer, file.originalname),
          purpose: 'assistants',
        });
      })
    );
  }
}
