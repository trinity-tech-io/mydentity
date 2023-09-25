import { Injectable } from "@nestjs/common";
import { WebSocketService } from "../websockets/ws.service";
import { ActivityEntity } from "./entities/activity.entity";
import { UserEntity } from "../user/entities/user.entity";
import { WebSocketEventType } from "../websockets/model/websocket.types";
import { logger } from "../logger";

@Injectable()
export class ActivityWsGateway {
    constructor(private readonly webSocketService: WebSocketService) {
        // Call webSocketService.on(...) here to handle a specific type of activity messages from client.
    }

    public async notifyActivityCreated(user: UserEntity, activity: ActivityEntity) {
        // logger.log('notifyActivityCreated', user, activity);
        await this.webSocketService.emit(user, WebSocketEventType.ACTIVITY_CREATED, activity);
    }
}