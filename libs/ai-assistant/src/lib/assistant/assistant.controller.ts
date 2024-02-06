import { Body, Controller, Post } from '@nestjs/common';
import { Assistant } from 'openai/resources/beta';
import { AssistantService } from './assistant.service';
import { AssistantFiles } from './assistant.model';

@Controller('assistant')
export class AssistantController {
  constructor(public readonly assistantService: AssistantService) {}

  @Post('')
  async updateAssistant(@Body() { files }: AssistantFiles): Promise<Assistant> {
    return this.assistantService.updateFiles(files);
  }
}
