import {Injectable} from '@nestjs/common';
import {ActivityEntity} from "./entities/activity.entity";
import {PrismaService} from "../prisma/prisma.service";
import {CreateActivityInput} from "./dto/create-activity.input";
import {UpdateActivityInput} from "./dto/update-activity.input";

@Injectable()
export class ActivityService {
    constructor(
        private prisma: PrismaService,
    ) {}

    public async findAll(userId: string): Promise<ActivityEntity[]> {
        return this.prisma.activity.findMany({
            where: {
                userId
            }
        });
    }

    public async findOne(userId: string, id: string): Promise<ActivityEntity> {
        return this.prisma.activity.findFirst({
            where: {
                id, userId
            }
        });
    }

    public async createActivity(userId: string, input: CreateActivityInput): Promise<ActivityEntity> {
        return this.prisma.activity.create({
            data: {
                type: input.type,
                content: input.content,
                user: {connect: {id: userId}}
            }
        });
    }

    public async updateActivity(input: UpdateActivityInput): Promise<ActivityEntity> {
        return this.prisma.activity.update({
            where: {
                id: input.id
            },
            data: {
                type: input.type,
                content: input.content
            }
        });
    }
}
