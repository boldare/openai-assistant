import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ChatEvents,
  ChatCallDto,
  TextDonePayload,
  ChatCallCallbacks,
  TextDeltaPayload,
  TextCreatedPayload,
  ToolCallDonePayload,
  ToolCallDeltaPayload,
  ToolCallCreatedPayload,
  MessageDeltaPayload,
  MessageCreatedPayload,
  MessageDonePayload,
  ImageFileDonePayload,
  RunStepCreatedPayload,
  RunStepDeltaPayload,
  RunStepDonePayload,
} from './chat.model';
import { ChatService } from './chat.service';
import {
  CodeInterpreterToolCallDelta,
  FunctionToolCallDelta,
} from 'openai/resources/beta/threads/runs';

export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;
  private readonly logger: Logger;

  constructor(protected readonly chatsService: ChatService) {
    this.logger = new Logger(ChatGateway.name);
  }

  log(message: string): void {
    try {
      const isLoggerEnabled: string = JSON.parse(
        (process.env['ASSISTANT_IS_LOGGER_ENABLED'] || 'false').toLowerCase(),
      );

      if (isLoggerEnabled) {
        this.logger.log(message);
      }
    } catch (error) {
      this.logger.error('"ASSISTANT_IS_LOGGER_ENABLED" should be boolean');
    }
  }

  async handleConnection() {
    this.log('Client connected');
  }

  getCallbacks(socketId: string): ChatCallCallbacks {
    return {
      [ChatEvents.MessageCreated]: eventData =>
        this.emitMessageCreated(socketId, eventData),
      [ChatEvents.MessageDelta]: eventData =>
        this.emitMessageDelta(socketId, eventData),
      [ChatEvents.MessageDone]: eventData =>
        this.emitMessageDone(socketId, eventData),
      [ChatEvents.TextCreated]: eventData =>
        this.emitTextCreated(socketId, eventData),
      [ChatEvents.TextDelta]: eventData =>
        this.emitTextDelta(socketId, eventData),
      [ChatEvents.TextDone]: eventData =>
        this.emitTextDone(socketId, eventData),
      [ChatEvents.ToolCallCreated]: this.emitToolCallCreated.bind(
        this,
        socketId,
      ),
      [ChatEvents.ToolCallDelta]: eventData =>
        this.emitToolCallDelta(socketId, eventData),
      [ChatEvents.ToolCallDone]: eventData =>
        this.emitToolCallDone(socketId, eventData),
      [ChatEvents.ImageFileDone]: eventData =>
        this.emitImageFileDone(socketId, eventData),
      [ChatEvents.RunStepCreated]: eventData =>
        this.emitRunStepCreated(socketId, eventData),
      [ChatEvents.RunStepDelta]: eventData =>
        this.emitRunStepDelta(socketId, eventData),
      [ChatEvents.RunStepDone]: eventData =>
        this.emitRunStepDone(socketId, eventData),
    };
  }

  @SubscribeMessage(ChatEvents.CallStart)
  async listenForMessages(
    @MessageBody() request: ChatCallDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.log(
      `Socket "${ChatEvents.CallStart}" | threadId ${request.threadId} | files: ${request?.file_ids?.join(', ')} | content: ${request.content}`,
    );

    const callbacks: ChatCallCallbacks = this.getCallbacks(socket.id);
    const message = await this.chatsService.call(request, callbacks);

    this.server?.to(socket.id).emit(ChatEvents.CallDone, message);
    this.log(
      `Socket "${ChatEvents.CallDone}" | threadId ${message.threadId} | content: ${message.content}`,
    );
  }

  async emitMessageCreated(
    socketId: string,
    @MessageBody() data: MessageCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageCreated, data);
    this.log(
      `Socket "${ChatEvents.MessageCreated}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitMessageDelta(
    socketId: string,
    @MessageBody() data: MessageDeltaPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageDelta, data);
    this.log(
      `Socket "${ChatEvents.MessageDelta}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitMessageDone(
    socketId: string,
    @MessageBody() data: MessageDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageDone, data);
    this.log(
      `Socket "${ChatEvents.MessageDone}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitTextCreated(
    socketId: string,
    @MessageBody() data: TextCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.TextCreated, data);
    this.log(`Socket "${ChatEvents.TextCreated}" | ${data.text.value}`);
  }

  async emitTextDelta(socketId: string, @MessageBody() data: TextDeltaPayload) {
    this.server.to(socketId).emit(ChatEvents.TextDelta, data);
    this.log(`Socket "${ChatEvents.TextDelta}" | ${data.textDelta.value}`);
  }

  async emitTextDone(socketId: string, @MessageBody() data: TextDonePayload) {
    this.server.to(socketId).emit(ChatEvents.TextDone, data);
    this.log(
      `Socket "${ChatEvents.TextDone}" | threadId: ${data.message?.thread_id} | ${data.text.value}`,
    );
  }

  async emitToolCallCreated(
    socketId: string,
    @MessageBody() data: ToolCallCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.ToolCallCreated, data);
    this.log(`Socket "${ChatEvents.ToolCallCreated}": ${data.toolCall.id}`);
  }

  codeInterpreterHandler(
    socketId: string,
    codeInterpreter: CodeInterpreterToolCallDelta.CodeInterpreter,
  ) {
    if (codeInterpreter?.input) {
      this.server
        .to(socketId)
        .emit(ChatEvents.ToolCallDelta, codeInterpreter.input);
    }

    if (codeInterpreter?.outputs) {
      codeInterpreter.outputs.forEach(output => {
        if (output.type === 'logs') {
          const outputLogs = output.logs;
          this.server.to(socketId).emit(ChatEvents.ToolCallDelta, outputLogs);
        }
      });
    }
  }

  functionHandler(
    socketId: string,
    functionType: FunctionToolCallDelta.Function,
  ) {
    if (functionType?.arguments) {
      this.server
        .to(socketId)
        .emit(ChatEvents.ToolCallDelta, functionType.arguments);
    }

    if (functionType?.output) {
      this.server
        .to(socketId)
        .emit(ChatEvents.ToolCallDelta, functionType.output);
    }
  }

  async emitToolCallDelta(
    socketId: string,
    @MessageBody() data: ToolCallDeltaPayload,
  ) {
    this.log(`Socket "${ChatEvents.ToolCallDelta}": ${data.toolCall.id}`);

    switch (data.toolCallDelta.type) {
      case 'code_interpreter':
        this.codeInterpreterHandler(
          socketId,
          data.toolCallDelta
            .code_interpreter as CodeInterpreterToolCallDelta.CodeInterpreter,
        );
        break;
      case 'function':
        this.functionHandler(
          socketId,
          data.toolCallDelta.function as FunctionToolCallDelta.Function,
        );
        break;
    }
  }

  async emitToolCallDone(
    socketId: string,
    @MessageBody() data: ToolCallDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.ToolCallDone, data);
    this.log(`Socket "${ChatEvents.ToolCallDone}": ${data.toolCall.id}`);
  }

  async emitImageFileDone(
    socketId: string,
    @MessageBody() data: ImageFileDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.ImageFileDone, data);
    this.log(`Socket "${ChatEvents.ImageFileDone}": ${data.content.file_id}`);
  }

  async emitRunStepCreated(
    socketId: string,
    @MessageBody() data: RunStepCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepCreated, data);
    this.log(`Socket "${ChatEvents.RunStepCreated}": ${data.runStep.status}`);
  }

  async emitRunStepDelta(
    socketId: string,
    @MessageBody() data: RunStepDeltaPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepDelta, data);
    this.log(`Socket "${ChatEvents.RunStepDelta}": ${data.runStep.status}`);
  }

  async emitRunStepDone(
    socketId: string,
    @MessageBody() data: RunStepDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepDone, data);
    this.log(`Socket "${ChatEvents.RunStepDone}": ${data.runStep.status}`);
  }
}
