import { ConfigService } from './config.service';
import { AssistantConfigParams } from '../assistant/assistant.model';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  it('should be defined', () => {
    expect(configService).toBeDefined();
  });

  it('should set and get config', () => {
    const config = { id: '1' } as AssistantConfigParams;

    configService.set(config);

    expect(configService.get()).toEqual(config);
    expect(configService.get().id).toEqual('1');
  });
});
