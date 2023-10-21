import { Injectable } from "@nestjs/common";
import { User, UserEmail } from "@prisma/client/main";
import { WebSocketEventType } from "../websockets/model/websocket.types";
import { WebSocketService } from "../websockets/ws.service";

@Injectable()
export class UserEmailWsGateway {
    constructor(private readonly webSocketService: WebSocketService) {
        // Call webSocketService.on(...) here to handle a specific type of activity messages from client.
    }

    public async notifyEmailCreated(user: User, email: UserEmail) {
        // logger.log('notifyActivityCreated', user, activity);
        await this.webSocketService.emit(user, WebSocketEventType.USER_EMAIL_CREATED, email);
    }
}