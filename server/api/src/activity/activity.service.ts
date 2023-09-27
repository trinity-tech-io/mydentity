import { Injectable } from '@nestjs/common';
import { Activity, User } from '@prisma/client/main';
import { PrismaService } from "../prisma/prisma.service";
import { ActivityWsGateway } from "./activity.ws.gateway";
import { CreateActivityInput } from "./dto/create-activity.input";

@Injectable()
export class ActivityService {
    constructor(
        private prisma: PrismaService,
        private readonly activityWsGateway: ActivityWsGateway
    ) { }

    public async findAll(userId: string): Promise<Activity[]> {
        return this.prisma.activity.findMany({
            where: {
                userId
            },
            include: {
                browser: true,
                userEmail: { include: { user: true } },
                identity: true,
            }
        });
    }

    public async findOne(userId: string, id: string): Promise<Activity> {
        return this.prisma.activity.findFirst({
            where: {
                id, userId
            },
            include: {
                browser: true,
                userEmail: { include: { user: true } },
                identity: true,
            }
        });
    }

    public async createActivity(user: User, input: CreateActivityInput): Promise<Activity> {
        const data = {
            type: input.type,
            user: { connect: { id: user.id } },
        }

        const appendField = (name: string) => {
            if (input[name] !== undefined && input[name] != null)
                data[name] = input[name];
        }
        const appendObj = (objName: string, isConnectDid = false) => {
            const name = `${objName}Id`;
            if (input[name] !== undefined && input[name] != null)
                data[objName] = isConnectDid ? { connect: { did: input[name] } } : { connect: { id: input[name] } };
        }

        appendObj('userEmail');
        appendField('userEmailProvider');
        appendField('userEmailAddress');
        appendObj('identity', true);
        appendField('identityDid');
        appendField('credentialsCount');
        appendField('appDid');
        appendObj('browser');
        appendField('browserName');

        const activity = await this.prisma.activity.create({ data });

        await this.activityWsGateway.notifyActivityCreated(user, activity);

        return activity;
    }
}
