import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  GetThreadDto,
  CreateThreadDto,
  CreateThreadResponseDto,
  GetThreadResponseDto,
} from './threads.model';
import { ThreadsService } from './threads.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Threads')
@Controller('assistant/threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @ApiResponse({ status: 200, type: GetThreadResponseDto })
  @Get(':id')
  async getThread(
    @Param() params: GetThreadDto,
  ): Promise<GetThreadResponseDto> {
    return await this.threadsService.getThread(params.id);
  }

  @ApiResponse({ status: 200, type: CreateThreadResponseDto })
  @ApiBody({ type: CreateThreadDto, required: false })
  @Post('')
  async createThread(
    @Body() payload?: CreateThreadDto,
  ): Promise<CreateThreadResponseDto> {
    return await this.threadsService.createThread(payload);
  }
}
