import { User } from "@prisma/client";
import { WebSocketActionType } from "./websocket.types";

export type ReceivedWSMessage = {
  socketID?: string; // Simple WS adapter only
  event: WebSocketActionType;
  authorization?: string;
}

export type ReceivedWSUserMessage = ReceivedWSMessage & {
  authenticatedUser: User;
}