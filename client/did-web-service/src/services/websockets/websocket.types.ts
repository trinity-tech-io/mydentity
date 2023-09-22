/**
 * Events received from the backend.
 */
export enum WebSocketEventType {
  INVALID_TOKEN = 'invalid_token',
  ACTIVITY_CREATED = 'activity_created'
}

/**
 * Actions sent by the front end to the backend
 */
export enum WebSocketActionType {
  HANDSHAKE = 'handshake'
}

export type WsMessageEvent<T> = {
  event: WebSocketEventType;
  data: T & {
    // Add additional common fields here.
  };
}