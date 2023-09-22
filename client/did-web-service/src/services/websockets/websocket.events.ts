import { Subject } from "rxjs";
import { WsMessageEvent } from "./websocket.types";

/**
 * Separated from the service to reduce circular dependencies
 *
 * Please check ActivityFeature.connectSocketEvents(...) to see how to handle messages from server.
 */
export const onMessage = new Subject<WsMessageEvent<any>>(); // Raw event