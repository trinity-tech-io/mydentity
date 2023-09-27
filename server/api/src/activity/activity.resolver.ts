import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client/main';
import { CurrentUser } from "../auth/currentuser.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ActivityService } from "./activity.service";
import { ActivityWsGateway } from "./activity.ws.gateway";
import { CreateActivityInput } from "./dto/create-activity.input";
import { ActivityEntity } from "./entities/activity.entity";

@Resolver()
export class ActivityResolver {
    constructor(private readonly activityService: ActivityService,
        private readonly activityWsGateway: ActivityWsGateway) { }

    /**
     * Query all activities.
     */
    @UseGuards(JwtAuthGuard)
    @Query(() => [ActivityEntity], { name: 'activities' })
    findAll(@CurrentUser() user: User) {
        return this.activityService.findAll(user.id);
    }

    /**
     * Create new activity
     */
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ActivityEntity)
    async createActivity(@CurrentUser() user: User, @Args('input') input: CreateActivityInput) {
        return await this.activityService.createActivity(user, input);
    }
}
