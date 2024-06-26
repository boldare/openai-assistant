import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Uploadable } from 'openai/uploads';
import { AiTranscription, PostSpeechDto, SpeechVoice } from './ai.model';
import 'dotenv/config';

@Injectable()
export class AiService {
  provider = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'] || '',
  });

  async transcription(file: Uploadable): Promise<AiTranscription> {
    return this.provider.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    });
  }

  async speech(data: PostSpeechDto): Promise<Buffer> {
    const response = await this.provider.audio.speech.create({
      model: 'tts-1',
      voice: data.voice || SpeechVoice.Alloy,
      input: data.content,
    });

    return Buffer.from(await response.arrayBuffer());
  }
}
