import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserEntity} from "../user/entities/user.entity";
import {CurrentUser} from "../auth/currentuser.decorator";
import {ActivityEntity} from "./entities/activity.entity";
import {ActivityService} from "./activity.service";
import {CreateActivityInput} from "./dto/create-activity.input";
import {UpdateActivityInput} from "./dto/update-activity.input";

@Resolver()
export class ActivityResolver {
    constructor(private readonly activityService: ActivityService) { }

    /**
     * Query all activities.
     */
    @UseGuards(JwtAuthGuard)
    @Query(() => [ActivityEntity])
    listActivities(@CurrentUser() user: UserEntity) {
        return this.activityService.findAll(user.id);
    }

    /**
     * Create new activity
     */
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ActivityEntity)
    createActivity(@CurrentUser() user: UserEntity, @Args('input') input: CreateActivityInput) {
        return this.activityService.createActivity(user.id, input);
    }

    /**
     * update the activity
     */
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ActivityEntity)
    async updateActivity(@CurrentUser() user: UserEntity, @Args('input') input: UpdateActivityInput) {
        const entity: ActivityEntity = await this.activityService.findOne(user.id, input.id);
        if (!entity)
            return null;

        return this.activityService.updateActivity(input);
    }
}
