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

  async handleConnection() {
    this.logger.log('Client connected');
  }

  getCallbacks(socketId: string): ChatCallCallbacks {
    return {
      [ChatEvents.MessageCreated]: this.emitMessageCreated.bind(this, socketId),
      [ChatEvents.MessageDelta]: this.emitMessageDelta.bind(this, socketId),
      [ChatEvents.MessageDone]: this.emitMessageDone.bind(this, socketId),
      [ChatEvents.TextCreated]: this.emitTextCreated.bind(this, socketId),
      [ChatEvents.TextDelta]: this.emitTextDelta.bind(this, socketId),
      [ChatEvents.TextDone]: this.emitTextDone.bind(this, socketId),
      [ChatEvents.ToolCallCreated]: this.emitToolCallCreated.bind(
        this,
        socketId,
      ),
      [ChatEvents.ToolCallDelta]: this.emitToolCallDelta.bind(this, socketId),
      [ChatEvents.ToolCallDone]: this.emitToolCallDone.bind(this, socketId),
      [ChatEvents.ImageFileDone]: this.emitImageFileDone.bind(this, socketId),
      [ChatEvents.RunStepCreated]: this.emitRunStepCreated.bind(this, socketId),
      [ChatEvents.RunStepDelta]: this.emitRunStepDelta.bind(this, socketId),
      [ChatEvents.RunStepDone]: this.emitRunStepDone.bind(this, socketId),
    };
  }

  @SubscribeMessage(ChatEvents.CallStart)
  async listenForMessages(
    @MessageBody() request: ChatCallDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(
      `Socket "${ChatEvents.CallStart}" | threadId ${request.threadId} | files: ${request?.file_ids?.join(', ')} | content: ${request.content}`,
    );

    const callbacks: ChatCallCallbacks = this.getCallbacks(socket.id);
    const message = await this.chatsService.call(request, callbacks);

    this.server?.to(socket.id).emit(ChatEvents.CallDone, message);
    this.logger.log(
      `Socket "${ChatEvents.CallDone}" | threadId ${message.threadId} | content: ${message.content}`,
    );
  }

  async emitMessageCreated(
    socketId: string,
    @MessageBody() data: MessageCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageCreated, data);
    this.logger.log(
      `Socket "${ChatEvents.MessageCreated}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitMessageDelta(
    socketId: string,
    @MessageBody() data: MessageDeltaPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageDelta, data);
    this.logger.log(
      `Socket "${ChatEvents.MessageDelta}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitMessageDone(
    socketId: string,
    @MessageBody() data: MessageDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.MessageDone, data);
    this.logger.log(
      `Socket "${ChatEvents.MessageDone}" | threadId: ${data.message.thread_id}`,
    );
  }

  async emitTextCreated(
    socketId: string,
    @MessageBody() data: TextCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.TextCreated, data);
    this.logger.log(`Socket "${ChatEvents.TextCreated}" | ${data.text.value}`);
  }

  async emitTextDelta(socketId: string, @MessageBody() data: TextDeltaPayload) {
    this.server.to(socketId).emit(ChatEvents.TextDelta, data);
    this.logger.log(
      `Socket "${ChatEvents.TextDelta}" | ${data.textDelta.value}`,
    );
  }

  async emitTextDone(socketId: string, @MessageBody() data: TextDonePayload) {
    this.server.to(socketId).emit(ChatEvents.TextDone, data);
    this.logger.log(
      `Socket "${ChatEvents.TextDone}" | threadId: ${data.message?.thread_id} | ${data.text.value}`,
    );
  }

  async emitToolCallCreated(
    socketId: string,
    @MessageBody() data: ToolCallCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.ToolCallCreated, data);
    this.logger.log(
      `Socket "${ChatEvents.ToolCallCreated}": ${data.toolCall.id}`,
    );
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
    this.logger.log(
      `Socket "${ChatEvents.ToolCallDelta}": ${data.toolCall.id}`,
    );

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
    this.logger.log(`Socket "${ChatEvents.ToolCallDone}": ${data.toolCall.id}`);
  }

  async emitImageFileDone(
    socketId: string,
    @MessageBody() data: ImageFileDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.ImageFileDone, data);
    this.logger.log(
      `Socket "${ChatEvents.ImageFileDone}": ${data.content.file_id}`,
    );
  }

  async emitRunStepCreated(
    socketId: string,
    @MessageBody() data: RunStepCreatedPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepCreated, data);
    this.logger.log(
      `Socket "${ChatEvents.RunStepCreated}": ${data.runStep.status}`,
    );
  }

  async emitRunStepDelta(
    socketId: string,
    @MessageBody() data: RunStepDeltaPayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepDelta, data);
    this.logger.log(
      `Socket "${ChatEvents.RunStepDelta}": ${data.runStep.status}`,
    );
  }

  async emitRunStepDone(
    socketId: string,
    @MessageBody() data: RunStepDonePayload,
  ) {
    this.server.to(socketId).emit(ChatEvents.RunStepDone, data);
    this.logger.log(
      `Socket "${ChatEvents.RunStepDone}": ${data.runStep.status}`,
    );
  }
}
