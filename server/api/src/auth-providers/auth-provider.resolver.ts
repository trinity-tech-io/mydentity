import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {UserEntity} from "../user/entities/user.entity";
import {UserService} from "../user/user.service";
import {LoggedUserOutput} from "../user/dto/logged-user.output";
import {MsSignInInput} from "./dto/ms-sign-in.input";
import {MsBindEmailInput} from "./dto/ms-bind-email.input";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CurrentUser} from "../auth/currentuser.decorator";
import {AppException} from "../exceptions/app-exception";
import {AuthExceptionCode} from "../exceptions/exception-codes";
import {MicrosoftProfileService} from "./microsoft-profile.service";
import {logger} from "../logger";
import {HeaderBrowserId} from "../browsers/browser-id-header.decorator";
import {UserAgent} from "../browsers/user-agent-decorator";

@Resolver(() => UserEntity)
export class AuthProviderResolver {
    constructor(
        private readonly userService: UserService,
        private readonly microsoftProfileService: MicrosoftProfileService,
    ) {}

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

    @Mutation(() => LoggedUserOutput, {nullable: true})
    async oauthMSSignIn(@HeaderBrowserId() browserId: string, @UserAgent() userAgent: string, @Args('input') input: MsSignInInput) {
        const email = await this.getEmailByMsCode(input.code);
        const result = await this.userService.signInByOauthEmail(email, browserId, userAgent);
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
        const resultUser = await this.userService.bindOauthEmail(user, email);
        if (!resultUser) {
            throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Email ${email} already belongs to other user.`, 401);
        }
        return true;
    }
}
