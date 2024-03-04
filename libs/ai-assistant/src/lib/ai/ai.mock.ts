import { AiTranscription } from './ai.model';
// @ts-expect-error multer is necessary
// eslint-disable-next-line
import { multer } from 'multer';

export const mockBuffer = Buffer.from('fake audio data');

export const mockFileData = {
  buffer: mockBuffer,
  mimetype: 'audio/wav',
} as Express.Multer.File;

export const transcriptionMock: AiTranscription = {
  text: 'Text from transcription',
};
