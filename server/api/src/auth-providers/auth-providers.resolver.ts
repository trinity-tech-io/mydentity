import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/currentuser.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { HeaderBrowserKey } from "../browsers/browser-key-header.decorator";
import { UserAgent } from "../browsers/user-agent-decorator";
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { LoggedUserOutput } from "../user/dto/logged-user.output";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { MsBindEmailInput } from "./dto/ms-bind-email.input";
import { MsSignInInput } from "./dto/ms-sign-in.input";
import { MicrosoftProfileService } from "./microsoft-profile.service";
import { ActivityType, User, UserEmail, UserEmailProvider } from "@prisma/client/main";
import { BrowsersService } from "../browsers/browsers.service";
import { ActivityService } from "../activity/activity.service";

@Resolver(() => UserEntity)
export class AuthProviderResolver {
    constructor(
        private readonly userService: UserService,
        private readonly microsoftProfileService: MicrosoftProfileService,
        private readonly browsersService: BrowsersService,
        private readonly activityService: ActivityService,
    ) { }

    private async getEmailByMsCode(code: string) {
        if (!code || code === '') {
            throw new AppException(AuthExceptionCode.AuthError, `MUST provide MS code.`, 401);
        }

        let email = null;
        try {
            email = await this.microsoftProfileService.fetchEmailByMsCode(code);
        } catch (e) {
            throw new AppException(AuthExceptionCode.AuthError, `can not get email by MS code.`, 401);
        }

        if (!email) {
            throw new AppException(AuthExceptionCode.AuthError, `can not get email by MS code..`, 401);
        }

        return email;
    }

    @Mutation(() => LoggedUserOutput, { nullable: true })
    async oauthMSSignIn(@HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string, @Args('input') input: MsSignInInput) {
        const email = await this.getEmailByMsCode(input.code);
        const result = await this.userService.signInByOauthEmail(email, browserKey, userAgent, async (userEmail: UserEmail & {user: User}) => {
            const browser = await this.browsersService.findOne(browserKey);
            await this.activityService.createActivity(userEmail.user.id, {
                type: ActivityType.USER_SIGN_IN,
                userEmailId: userEmail.id,
                userEmailProvider: UserEmailProvider.MICROSOFT,
                userEmailAddress: userEmail.email,
                browserId: browser.id,
                browserName: browser.name,
            });
        });
        if (!result) {
            throw new AppException(AuthExceptionCode.InexistingEmail, `Email ${email} already belongs to other user.`, 401);
        }

        logger.log(`sign in with oauth email successfully.`);

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async oauthMSBindEmail(@CurrentUser() user: UserEntity, @Args('input') input: MsBindEmailInput) {
        const email = await this.getEmailByMsCode(input.code);
        const resultUser = await this.userService.bindOauthEmail(user, email, async (userEmail) => {
            await this.activityService.createActivity(user.id, {
                type: ActivityType.BIND_EMAIL,
                userEmailId: userEmail.id,
                userEmailProvider: UserEmailProvider.MICROSOFT,
                userEmailAddress: userEmail.email,
            });
        });
        if (!resultUser) {
            throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Email ${email} already belongs to other user.`, 401);
        }
        return true;
    }
}
