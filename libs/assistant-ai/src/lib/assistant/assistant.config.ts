import { Injectable } from '@nestjs/common';
import { AssistantConfigParams } from './assistant.model';

@Injectable()
export class AssistantConfig {
  private params!: AssistantConfigParams;

  set(params: AssistantConfigParams): void {
    this.params = params;
  }

  get(): AssistantConfigParams {
    return this.params;
  }
}
