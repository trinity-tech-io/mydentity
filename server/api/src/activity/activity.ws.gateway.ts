import { Injectable } from "@nestjs/common";
import { Activity, User } from "@prisma/client/main";
import { WebSocketEventType } from "../websockets/model/websocket.types";
import { WebSocketService } from "../websockets/ws.service";

@Injectable()
export class ActivityWsGateway {
    constructor(private readonly webSocketService: WebSocketService) {
        // Call webSocketService.on(...) here to handle a specific type of activity messages from client.
    }

    public async notifyActivityCreated(user: User, activity: Activity) {
        // logger.log('notifyActivityCreated', user, activity);
        await this.webSocketService.emit(user, WebSocketEventType.ACTIVITY_CREATED, activity);
    }
}