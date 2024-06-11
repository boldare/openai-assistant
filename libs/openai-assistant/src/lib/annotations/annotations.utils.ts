import OpenAI from "openai";
import { FileCitationAnnotation, FilePathAnnotation, Message } from "openai/resources/beta/threads";
import { AnnotationData, AnnotationType } from "./annotations.model";

export const isFileCitation = (item: { type: string }): item is FileCitationAnnotation => item.type === 'file_citation';
export const isFilePath = (item: { type: string }): item is FilePathAnnotation => item.type === 'file_path';

export const getAnnotations = async (message: Message, provider: OpenAI): Promise<AnnotationData[]> => {
  if (message.content[0].type !== 'text') {
    return [];
  }

  const { text } = message.content[0];
  const { annotations } = text;
  const annotationsData: AnnotationData[] = [];

  let index = 1;

  for (const annotation of annotations) {
    let data = null;

    if (isFileCitation(annotation)) {
      data = annotation[AnnotationType.file_citation];
    }

    if (isFilePath(annotation)) {
      data = annotation[AnnotationType.file_path];
    }

    if (data) {
      const file = await provider.files.retrieve(data.file_id);
      annotationsData.push({ annotation, index, file });
    }
   
    index++;
  }

  return annotationsData;
}
