import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import {
  PostSpeechDto,
  PostSpeechResponseDto,
  PostTranscriptionDto,
  PostTranscriptionResponseDto,
} from './ai.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { toFile } from 'openai/uploads';
// @ts-expect-error multer is necessary
// eslint-disable-next-line
import { multer } from 'multer';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('assistant/ai')
export class AiController {
  constructor(public readonly aiService: AiService) {}

  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    type: PostTranscriptionResponseDto,
  })
  @ApiBody({
    description: 'Audio file to be transcribed.',
    type: PostTranscriptionDto,
  })
  @Post('transcription')
  @UseInterceptors(FileInterceptor('file'))
  async postTranscription(
    @UploadedFile() fileData: Express.Multer.File,
  ): Promise<PostTranscriptionResponseDto> {
    try {
      const file = await toFile(fileData.buffer, 'audio.wav', { type: 'wav' });
      const transcription = await this.aiService.transcription(file);

      return { content: transcription.text };
    } catch (error) {
      throw new Error('Error processing transcription');
    }
  }

  @ApiResponse({
    status: 200,
    type: PostSpeechResponseDto,
    description: 'TTS - response as the audio buffer',
  })
  @Post('speech')
  async postSpeech(@Body() payload: PostSpeechDto): Promise<Buffer> {
    try {
      return await this.aiService.speech(payload);
    } catch (error) {
      throw new Error('Error processing speech');
    }
  }
}
