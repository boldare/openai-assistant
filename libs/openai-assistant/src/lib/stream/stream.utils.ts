import { AbstractAssistantStreamRunner } from 'openai/lib/AbstractAssistantStreamRunner';
import { AssistantStreamEvents } from 'openai/lib/AssistantStream';
import {
  Message,
  MessageDelta,
  Text,
  TextDelta,
} from 'openai/resources/beta/threads';
import {
  RunStepDelta,
  ToolCall,
  ToolCallDelta,
} from 'openai/resources/beta/threads/runs';
import { ImageFile } from 'openai/resources/beta/threads/messages/messages';
import { RunStep } from 'openai/resources/beta/threads/runs/steps';
import { ChatCallCallbacks, ChatEvents } from '../chat/chat.model';

export const assistantStreamEventHandler = <T>(
  runner: AbstractAssistantStreamRunner<AssistantStreamEvents>,
  callbacks?: ChatCallCallbacks,
) => {
  return runner
    .on(ChatEvents.MessageCreated, (message: Message) =>
      callbacks?.[ChatEvents.MessageCreated]?.({ message }),
    )
    .on(
      ChatEvents.MessageDelta,
      (messageDelta: MessageDelta, message: Message) =>
        callbacks?.[ChatEvents.MessageDelta]?.({ messageDelta, message }),
    )
    .on(ChatEvents.MessageDone, (message: Message) =>
      callbacks?.[ChatEvents.MessageDone]?.({ message }),
    )
    .on(ChatEvents.TextCreated, (content: Text) =>
      callbacks?.[ChatEvents.TextCreated]?.({ text: content }),
    )
    .on(ChatEvents.TextDelta, (delta: TextDelta, snapshot: Text) =>
      callbacks?.[ChatEvents.TextDelta]?.({ textDelta: delta, text: snapshot }),
    )
    .on(ChatEvents.TextDone, (text: Text, message: Message) =>
      callbacks?.[ChatEvents.TextDone]?.({ text, message }),
    )
    .on(ChatEvents.ToolCallCreated, (toolCall: ToolCall) =>
      callbacks?.[ChatEvents.ToolCallCreated]?.({ toolCall }),
    )
    .on(
      ChatEvents.ToolCallDelta,
      (toolCallDelta: ToolCallDelta, toolCall: ToolCall) =>
        callbacks?.[ChatEvents.ToolCallDelta]?.({ toolCallDelta, toolCall }),
    )
    .on(ChatEvents.ToolCallDone, (toolCall: ToolCall) =>
      callbacks?.[ChatEvents.ToolCallDone]?.({ toolCall }),
    )
    .on(ChatEvents.ImageFileDone, (content: ImageFile, message: Message) =>
      callbacks?.[ChatEvents.ImageFileDone]?.({ message, content }),
    )
    .on(ChatEvents.RunStepCreated, (runStep: RunStep) =>
      callbacks?.[ChatEvents.RunStepCreated]?.({ runStep }),
    )
    .on(
      ChatEvents.RunStepDelta,
      (runStepDelta: RunStepDelta, runStep: RunStep) =>
        callbacks?.[ChatEvents.RunStepDelta]?.({ runStepDelta, runStep }),
    )
    .on(ChatEvents.RunStepDone, (runStep: RunStep) =>
      callbacks?.[ChatEvents.RunStepDone]?.({ runStep }),
    ) as T;
};
