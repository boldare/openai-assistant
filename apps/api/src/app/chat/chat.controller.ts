import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Assistant, Thread } from 'openai/resources/beta';
import { ChatCall, GetThreadParams, ThreadConfig } from './chat.model';
import { ChatService } from './chat.service';
import {
  AiService,
  AssistantFiles,
  AssistantService,
} from '@boldare/assistant-ai';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('chat')
export class ChatController {
  constructor(
    public readonly chatService: ChatService,
    public readonly assistantService: AssistantService,
    public readonly aiService: AiService,
  ) {}

  @Get('thread/:id')
  async getThread(@Param() params: GetThreadParams): Promise<Thread> {
    return await this.chatService.getThread(params.id);
  }

  @Post('thread')
  async createThread(@Body() payload: ThreadConfig): Promise<Thread> {
    return await this.chatService.createThread(payload);
  }

  @Post()
  async call(@Body() payload: ChatCall): Promise<ChatCall> {
    return await this.chatService.call(payload);
  }

  @Post('transcription')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${process.env.AUDIO_UPLOAD_PATH}`,
        filename(req, file, callback) {
          callback(null, `audio-${new Date().toJSON()}.wav`);
        },
      }),
    }),
  )
  async postTranscription(@UploadedFile() file: Express.Multer.File) {
    const stream = fs.createReadStream(
      `${process.env.AUDIO_UPLOAD_PATH}/${file.filename}`,
    );
    return {
      content: (await this.aiService.transcription(stream)).text,
      filename: file.filename,
    };
  }

  @Post('speech')
  async postSpeech(@Body() { content }: { content: string }) {
    return await this.aiService.speech(content);
  }

  @Post('files')
  async updateFiles(@Body() { files }: AssistantFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(files);
  }
}
