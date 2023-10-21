import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client/main';
import { CurrentUser } from "../auth/currentuser.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ActivityService } from "./activity.service";
import { ActivityWsGateway } from "./activity.ws.gateway";
import { CreateActivityInput } from "./dto/create-activity.input";
import { ActivityEntity } from "./entities/activity.entity";
import { DeleteActivitiesInput } from "./dto/delete-activities.input";
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";

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

    /**
     * Delete activities
     */
    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async deleteActivities(@CurrentUser() user: User, @Args('input') input: DeleteActivitiesInput) {
        if (!input.ids || input.ids.length === 0)
            return true;

        if (!await this.activityService.isOwnActivities(user, input.ids))
            throw new AppException(AuthExceptionCode.AuthError, 'Not all activity ids belongs to you.', 401);

        await this.activityService.deleteActivities(user, input);
        return true;
    }
}
