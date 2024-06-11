import { FileObject } from 'openai/resources';
import { Annotation } from 'openai/resources/beta/threads/messages';

export interface AnnotationData {
  annotation: Annotation;
  index: number;
  file: FileObject;
}

export enum AnnotationType {
  file_citation = 'file_citation',
  file_path = 'file_path',
}
