import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Subject } from 'rxjs';
import { logger } from '../logger';
import { PrismaService } from '../prisma/prisma.service';
import { ReceivedWSMessage, ReceivedWSUserMessage } from './model/received-ws-message';
import { WebSocketActionType, WebSocketEventType } from './model/websocket.types';
import { SimpleWebsocketAdapter } from './simple-adapter/simple-ws-adapter';
import { WebsocketAdapter } from './ws-adapter';
import { UserEntity } from "../user/entities/user.entity";
import { WebSocketCacheService } from './ws-cache.service';

@Injectable()
export class WebSocketService {
  private adapter: WebsocketAdapter; // in-house WS adapter, not nest's.
  private onMessageSubjects: Map<WebSocketActionType, Subject<ReceivedWSUserMessage>> = new Map();

  constructor(
    @Inject(forwardRef(() => ConfigService)) private readonly configService: ConfigService,
    @Inject(forwardRef(() => JwtService)) private readonly jwtTokenService: JwtService,
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => WebSocketCacheService)) private readonly webSocketCacheService: WebSocketCacheService,
    @Inject(forwardRef(() => HttpAdapterHost)) private adapterHost: HttpAdapterHost
  ) {
    // Setup the websocket adapter
    const httpAdapter = adapterHost.httpAdapter;
    this.setAdapter(new SimpleWebsocketAdapter(httpAdapter.getInstance()));
  }

  public setAdapter(adapter: WebsocketAdapter) {
    this.adapter = adapter;
    this.adapter.onMessage$.subscribe(message => {
      this.onAdapterMessage(message);
    });
  }

  public getHandler<T extends WebsocketAdapter>(): T {
    return <T>this.adapter;
  }

  /**
   * Message handler's type has already been defined.
   *
   * Every type message -> message handler.
   */
  private getMessageHandler<T extends ReceivedWSUserMessage>(type: WebSocketActionType): Subject<T> {
    if (!this.onMessageSubjects.has(type))
      this.onMessageSubjects.set(type, new Subject<T>());
    return <Subject<T>>this.onMessageSubjects.get(type);
  }

  /**
   * Register message handler by the service.
   * @param type
   */
  public on<T extends ReceivedWSUserMessage>(type: WebSocketActionType): Subject<T> {
    return this.getMessageHandler(type);
  }

  /**
   * Handle messages here which come from adapter.
   */
  private async onAdapterMessage(message: ReceivedWSMessage) {
    console.log("WS SERVICE RECEIVED ADAPTER MESSAGE", message)
    const bearerToken = message.authorization;

    if (!bearerToken || bearerToken === 'null') {
      // ws.close();
      return;
    }

    try {
      const decoded = this.jwtTokenService.verify(bearerToken) as any;

      const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
      if (!user)
        throw new Error('Can not find user by token');

      // TODO: we can't emit to ALL connected sockets in prod ... right?
      // this.adapter.emitEvent(WebSocketEventType.USER_ONLINE, user);

      // TODO:
      // this.userService.saveLastSeenNow(user);

      await this.webSocketCacheService.appendSocketId(user.id, message.socketID);
      console.log(`this.webSocketCacheService.appendSocketId`, user.id, message.socketID);

      // Emit message to action type listeners in services
      this.getMessageHandler(message.event).next({
        ...message,
        authenticatedUser: user
      });

    } catch (ex) {
      logger.error(`WS connection error: ${ex.message}, ${bearerToken}`);

      /* TODO client.emit(WebSocketEventType.INVALID_TOKEN, {})
      // Wait for client get INVALID_TOKEN message.
      setTimeout(() => { client.disconnect(true); }, 5000);*/
    }
  }

  /**
   * Emit event to the sockets of the user.
   */
  public async emit(user: UserEntity, type: WebSocketEventType, event: any) {
    console.log('WS SERVICE EMIT', user, type, event);
    const socketIds: string[] = await this.webSocketCacheService.getSocketIds(user.id);
    // logger.log('emit socket ids:', socketIds, type, event);
    const invalidSocketIds = this.emitEvent(socketIds, type, event);
    await this.webSocketCacheService.removeSocketIds(user.id, invalidSocketIds);
  }

  private emitEvent(socketIds: string | string[], type: WebSocketEventType, event: any) {
    console.log("WS SERVICE EMIT EVENT", socketIds, type, event)

    const targetSocketIds: string[] = typeof socketIds === "string" ? [socketIds] : socketIds;

    // Matches type WsMessageEvent on the client side
    return this.adapter.emitEvent(targetSocketIds, type, {
      data: event
    });


  }
}
