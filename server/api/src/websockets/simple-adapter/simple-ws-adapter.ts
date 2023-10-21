import { randomUUID } from 'crypto';
import { IncomingMessage, Server } from 'http';
import { Subject } from 'rxjs';
import { Server as WSServer, WebSocket } from 'ws';
import { logger } from '../../logger';
import { ReceivedWSMessage } from '../model/received-ws-message';
import { WebSocketEventType } from '../model/websocket.types';
import { WebsocketAdapter } from "../ws-adapter";

type ExtendedWebSocket = WebSocket & {
  id: string;
}

export class SimpleWebsocketAdapter implements WebsocketAdapter {
  public onMessage$ = new Subject<ReceivedWSMessage>();

  private wss: WSServer;
  // List of all connected sockets. socketID -> WebSocket
  private connectedSockets: Map<string, WebSocket> = new Map();

  constructor(httpServer: Server) {
    this.createWebSocketServer(httpServer);
  }

  private createWebSocketServer(server: Server) {
    // Standalone WS server not bound to express during development
    this.wss = new WebSocket.Server({
      path: "/ws",
      port: process.env.WEBSOCKET_PORT
    });

    logger.log("Creating simple - WS server");

    this.wss.on('connection', (ws, request) => {
      logger.log("Incoming WS connection");
      this.onConnect({ ws: <ExtendedWebSocket>ws, request });
    });

    this.wss.on('error', (e) => {
      console.error("ws error", e);
    })

    this.wss.on('close', (ws) => {
      console.error("ws close", ws);
      this.onDisconnect(ws);
    });

    return this.wss;
  }

  private onConnect(data: { ws: ExtendedWebSocket, request: IncomingMessage }) {
    const { ws } = data;

    const socketID = randomUUID();
    ws.id = socketID;
    this.connectedSockets.set(socketID, ws);

    // Do nothing special, wait for the handshake message with the authorization token to start
    // mapping a WS with a user

    ws.on('message', message => {
      const jsonMessage = JSON.parse(message.toString()) as ReceivedWSMessage;
      // console.log('RAW MESSAGE:', jsonMessage);
      this.handleReceivedMessage(ws, jsonMessage);
    })
  }

  private async handleReceivedMessage(ws: ExtendedWebSocket, message: ReceivedWSMessage) {
    this.onMessage$.next({ ...message, socketID: ws.id });
  }

  private onDisconnect(socketId: string) {
    this.connectedSockets.delete(socketId);

    /*  TODO const user = client['user'] as User;
     if (!user) {
       //console.error(`disconnected no authed user.`)
       return;
     }

     this.wsUserCache.remove(user.id);

     client.emit(WebSocketEventType.USER_OFFLINE, user); */
  }

  public emitEvent(socketIds: string[], type: WebSocketEventType, data: any): string[] {
    const invalidSocketIds = [];
    for (const socketId of socketIds) {
      const socket = this.connectedSockets.get(socketId);
      if (!socket) {
        logger.warn(`Can't emit event to inexisting socket id: ${socketId}`);
        invalidSocketIds.push(socketId);
        continue;
      }

      // Try to remove closed socket here.
      if (socket.readyState === WebSocket.CLOSED) {
        this.connectedSockets.delete(socketId);
        invalidSocketIds.push(socketId);
        continue;
      }

      socket.send(JSON.stringify({ event: type, ...data }));
    }

    return invalidSocketIds;
  }
}