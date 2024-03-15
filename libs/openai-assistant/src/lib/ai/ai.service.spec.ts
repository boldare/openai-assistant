import { toFile } from 'openai/uploads';
import { Response } from 'openai/core';
import { AiService } from './ai.service';
import { mockBuffer, transcriptionMock } from './ai.mock';

describe('AiService', () => {
  let aiService: AiService;

  beforeEach(() => {
    aiService = new AiService();

    jest
      .spyOn(aiService.provider.audio.transcriptions, 'create')
      .mockResolvedValue(transcriptionMock);

    jest.spyOn(aiService.provider.audio.speech, 'create').mockResolvedValue({
      arrayBuffer: jest.fn().mockResolvedValue(mockBuffer),
    } as unknown as Response);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return transcription', async () => {
    const file = await toFile(mockBuffer, 'audio.mp3', { type: 'mp3' });

    const transcription = await aiService.transcription(file);

    expect(transcription.text).toBe(transcriptionMock.text);
  });

  it('should return speech', async () => {
    const data = { content: 'test content' };

    const speech = await aiService.speech(data);

    expect(speech).toStrictEqual(mockBuffer);
  });
});
