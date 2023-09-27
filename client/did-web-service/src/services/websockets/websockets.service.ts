import { configService } from "@services/config/config.service";
import { Subject } from 'rxjs';
import { logger } from '@services/logger';
import { Sockette } from "./sockette-improved";
import { onMessage } from "./websocket.events";
import { WebSocketActionType, WebSocketEventType, WsMessageEvent } from './websocket.types';
import { authUser$ } from "@services/user/user.events";
import { isClientSide } from "@utils/client-server";

class WebSocketsService {
  private sockette: Sockette;
  private token: string;
  private firstConnection = true;

  private onError = new Subject<Event>();
  private onClose = new Subject<CloseEvent>();
  private onConnect = new Subject<Event>();

  public onReconnect = new Subject(); // Web sockets get reconnected to the backend

  private initInternal(): void {
    // console.log('WebSocketsService.initInternal');
    if (!isClientSide())
      return;

    const url = `${configService.get('wsUrl')}`;

    const token = this.getAccessToken();
    // console.log('WebSocketsService.initInternal', this.token, token);
    if (token && this.token === token) {
      return; // same token
    }
    this.token = token;

    if (this.sockette && this.sockette.ready())
      this.sockette.close();

    this.sockette = new Sockette(url, {
      timeout: 5000,
      onerror: (e): any => {
        logger.warn("websockets", "Error", e);
        this.onError.next(e)
      },
      onclose: (e): any => {
        logger.warn("websockets", "Closed", e);
        this.onClose.next(e)
      },
      onopen: (): any => {
        logger.log("websockets", "Socket connection established");
        this.handleOnConnect();
      },
      onmaximum: (e): any => {
        logger.warn("websockets", "Maximum number of reconnect attempts reached, not trying any more.");
      },
      onreconnect: (e): any => {
        logger.warn("websockets", "Reconnect attempt");
      },
      onmessage: (event): any => {
        // TODO: unused init value.
        let eventData: WsMessageEvent<unknown> = event.data;
        try {
          eventData = JSON.parse(event.data);
        }
        catch (e) {
          // Not a json object
          logger.warn("websockets", "Received a non JSON message, this is abnormal", event)
          return;
        }

        logger.log("websockets", "Receiving raw event:", event, eventData)
        if (eventData.event === WebSocketEventType.INVALID_TOKEN) { // token expired.
          // refresh token, then reload page for all ws operations.
          // TODO:
          // void refreshToken().then(() => window.location.reload());
          return;
        }

        onMessage.next(eventData);
      }
    });
  }

  /**
   * Please call this on App.
   */
  public init(): void {
    this.initInternal();

    // Active user changed.
    authUser$.subscribe(user => {
      this.initInternal();
    })
  }

  private handleOnConnect(): void {
    this.emit(WebSocketActionType.HANDSHAKE);

    this.onConnect.next(null);
    if (!this.firstConnection) {
      logger.log("websockets", "Web sockets reconnected to backend");
      this.onReconnect.next(null);
    }
    this.firstConnection = false;
  }

  private getAccessToken(): string {
    if (typeof window === 'undefined') {
      return undefined;
    }

    return localStorage.getItem('access_token');
  }

  /**
   * Sends any websocket event to the backend.
   */
  public emit(event: WebSocketActionType, params?: any): void {
    // console.log('emit', event, this.token, this.getAccessToken());
    this.sockette.send(JSON.stringify({
      event,
      ...{ authorization: this.token },
      ...params
    }));
  }

  /**
   * close the underlining websocket.
   * @private
   */
  private close(): void {
    this.sockette.close();
  }
}

export const webSocketsService = new WebSocketsService();