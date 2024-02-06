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

@Controller('assistant/ai')
export class AiController {
  constructor(public readonly aiService: AiService) {}

  @Post('transcription')
  @UseInterceptors(FileInterceptor('file'))
  async postTranscription(@UploadedFile() fileData: Express.Multer.File) {
    const file = await toFile(fileData.buffer, 'audio.wav', { type: 'wav' });
    const transcription = await this.aiService.transcription(file);

    return { content: transcription.text };
  }

  @Post('speech')
  async postSpeech(@Body() payload: SpeechPayload): Promise<Buffer> {
    return await this.aiService.speech(payload);
  }
}
