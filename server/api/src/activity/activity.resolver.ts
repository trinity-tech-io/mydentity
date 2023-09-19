import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserEntity} from "../user/entities/user.entity";
import {CurrentUser} from "../auth/currentuser.decorator";
import {ActivityEntity} from "./entities/activity.entity";
import {ActivityService} from "./activity.service";
import {CreateActivityInput} from "./dto/create-activity.input";

@Resolver()
export class ActivityResolver {
    constructor(private readonly activityService: ActivityService) { }

    /**
     * Query all activities.
     */
    @UseGuards(JwtAuthGuard)
    @Query(() => [ActivityEntity], {name: 'activities'})
    findAll(@CurrentUser() user: UserEntity) {
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
}
