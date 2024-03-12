import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { SpeechPayload } from './ai.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { toFile } from 'openai/uploads';
// @ts-expect-error multer is necessary
// eslint-disable-next-line
import { multer } from 'multer';

@Controller('assistant/ai')
export class AiController {
  constructor(public readonly aiService: AiService) {}

  @Post('transcription')
  @UseInterceptors(FileInterceptor('file'))
  async postTranscription(@UploadedFile() fileData: Express.Multer.File) {
    try {
      const file = await toFile(fileData.buffer, 'audio.wav', { type: 'wav' });
      const transcription = await this.aiService.transcription(file);

      return { content: transcription.text };
    } catch (error) {
      throw new Error('Error processing transcription');
    }
  }

  @Post('speech')
  async postSpeech(@Body() payload: SpeechPayload): Promise<Buffer> {
    try {
      return await this.aiService.speech(payload);
    } catch (error) {
      throw new Error('Error processing speech');
    }
  }
}
