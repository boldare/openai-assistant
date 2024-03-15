import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { mockBuffer, mockFileData, transcriptionMock } from './ai.mock';
import { Response } from 'openai/core';

describe('AiController', () => {
  let aiController: AiController;
  let aiService: AiService;

  beforeEach(() => {
    aiService = new AiService();
    aiController = new AiController(aiService);

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

  describe('transcription', () => {
    it('should return transcription', async () => {
      const transcription = await aiController.postTranscription(mockFileData);

      expect(transcription).toEqual({ content: transcriptionMock.text });
    });

    it('should throw an error', async () => {
      try {
        await aiController.postTranscription(mockFileData);
      } catch (error) {
        expect((error as Error).message).toBeTruthy();
      }
    });
  });

  describe('speech', () => {
    it('should return speech', async () => {
      const speech = await aiController.postSpeech({ content: 'Hello' });

      expect(speech).toBeInstanceOf(Buffer);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(aiService.provider.audio.speech, 'create')
        .mockRejectedValue(new Error());

      try {
        await aiController.postSpeech({ content: 'Hello' });
      } catch (error) {
        expect((error as Error).message).toBeTruthy();
      }
    });
  });
});
