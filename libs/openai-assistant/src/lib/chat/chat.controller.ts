import { Body, Controller, Post } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatCallDto, ChatCallResponseDto } from './chat.model';
import { ChatService } from './chat.service';

@Controller(`assistant/chat`)
@ApiTags('Chat')
export class ChatController {
  constructor(public readonly chatsService: ChatService) {}

  @ApiResponse({
    status: 200,
    type: ChatCallResponseDto,
    description: 'Default action for conversation between user and bot',
  })
  @ApiBody({ type: ChatCallDto })
  @Post()
  async call(@Body() payload: ChatCallDto): Promise<ChatCallResponseDto> {
    return await this.chatsService.call(payload);
  }
}
