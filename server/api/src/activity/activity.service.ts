import {Injectable} from '@nestjs/common';
import {ActivityEntity} from "./entities/activity.entity";
import {PrismaService} from "../prisma/prisma.service";
import {CreateActivityInput} from "./dto/create-activity.input";

@Injectable()
export class ActivityService {
    constructor(
        private prisma: PrismaService,
    ) {}

    public async findAll(userId: string): Promise<ActivityEntity[]> {
        return this.prisma.activity.findMany({
            where: {
                userId
            },
            include: {
                browser: true,
                userEmail: {include: {user: true}},
                identity: true,
            }
        });
    }

    public async findOne(userId: string, id: string): Promise<ActivityEntity> {
        return this.prisma.activity.findFirst({
            where: {
                id, userId
            },
            include: {
                browser: true,
                userEmail: {include: {user: true}},
                identity: true,
            }
        });
    }

    public async createActivity(userId: string, input: CreateActivityInput): Promise<ActivityEntity> {
        const data = {
            type: input.type,
            user: {connect: {id: userId}},
        }

        const appendField = (name: string) => {
            if (input[name] !== undefined && input[name] != null)
                data[name] = input[name];
        }
        const appendObj = (objName: string, isConnectDid=false) => {
            const name = `${objName}Id`;
            if (input[name] !== undefined && input[name] != null)
                data[objName] = isConnectDid ? {connect: {did: input[name]}} : {connect: {id: input[name]}};
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

        return this.prisma.activity.create({data});
    }
}
