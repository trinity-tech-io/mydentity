/**
 * server -> client.
 */
export enum WebSocketEventType {
  INVALID_TOKEN = 'invalid_token',
  ACTIVITY_CREATED = 'activity_created'
}

/**
 * client -> server.
 */
export enum WebSocketActionType {
  HANDSHAKE = 'handshake'
}