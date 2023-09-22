import { Subject } from "rxjs";
import { ReceivedWSMessage } from "./model/received-ws-message";
import { WebSocketEventType } from "./model/websocket.types";

export interface WebsocketAdapter {
  onMessage$: Subject<ReceivedWSMessage>;

  /**
   * Send an event to a list of sockets
   */
  emitEvent(socketId: string[], type: WebSocketEventType, data: any);
}