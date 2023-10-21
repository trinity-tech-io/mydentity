/**
 * server -> client.
 */
export enum WebSocketEventType {
  INVALID_TOKEN = 'invalid_token',
  ACTIVITY_CREATED = 'activity_created',
  USER_EMAIL_CREATED = 'user_email_created'
}

/**
 * client -> server.
 */
export enum WebSocketActionType {
  HANDSHAKE = 'handshake'
}