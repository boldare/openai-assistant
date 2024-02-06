import { Injectable } from '@nestjs/common';
import { AssistantConfigParams } from '../assistant';

@Injectable()
export class ConfigService {
  private params!: AssistantConfigParams;

  set(params: AssistantConfigParams): void {
    this.params = params;
  }

  get(): AssistantConfigParams {
    return this.params;
  }
}
