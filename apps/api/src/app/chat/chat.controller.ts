import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile, UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Assistant, Thread } from 'openai/resources/beta';
import { GetThreadParams, ThreadConfig } from './chat.model';
import { ChatService } from './chat.service';
import {
  AiService,
  AssistantFiles,
  AssistantService, ChatCall, ChatCallResponse, SpeechPayload, OpenAiFile,
} from '@boldare/assistant-ai';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
// @ts-ignore
import { multer } from 'multer';
import { toFile } from 'openai/uploads';

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
  async call(@Body() payload: ChatCall): Promise<ChatCallResponse> {
    return await this.chatService.call(payload);
  }

  @Post('transcription')
  @UseInterceptors(FileInterceptor('file'))
  async postTranscription(@UploadedFile() fileData: Express.Multer.File) {
    const file = await toFile(fileData.buffer, 'audio.wav', { type: 'wav' });
    const transcription = (await this.aiService.transcription(file));

    return { content: transcription.text };
  }

  @Post('speech')
  async postSpeech(@Body() payload: SpeechPayload): Promise<Buffer> {
    return await this.aiService.speech(payload);
  }

  @Post('files/assistant')
  async updateAssistantFiles(@Body() { files }: AssistantFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(files);
  }

  @Post('files')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async updateFiles(@UploadedFiles() uploadedData: { files: Express.Multer.File[] }): Promise<OpenAiFile[]> {
    return this.aiService.files(uploadedData.files);
  }
}
