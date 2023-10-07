import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client/main";
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
import { GoogleProfileService } from "./google-profile.service";
import { GoogleSignInInput } from "./dto/google-sign-in.input";
import { GoogleBindEmailInput } from "./dto/google-bind-email.input";
import { UserEmailProvider } from "@prisma/client/main";
import { LinkedinSignInInput } from "./dto/linkedin-sign-in.input";
import { LinkedinBindEmailInput } from "./dto/linkedin-bind-email.input";
import { LinkedinProfileService } from "./linkedin-profile.service";

@Resolver(() => UserEntity)
export class AuthProviderResolver {
    constructor(
        private readonly userService: UserService,
        private readonly microsoftProfileService: MicrosoftProfileService,
        private readonly googleProfileService: GoogleProfileService,
        private readonly linkedinProfileService: LinkedinProfileService
    ) { }

    // Microsoft Oauth

    @Mutation(() => LoggedUserOutput, { nullable: true })
    async oauthMSSignIn(@HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string, @Args('input') input: MsSignInInput) {
        const email = await this.microsoftProfileService.getEmailAddressByCode(input.code);
        const result = await this.userService.signInByOauthEmail(email, UserEmailProvider.MICROSOFT, browserKey, userAgent);
        if (!result) {
            throw new AppException(AuthExceptionCode.InexistingEmail, `Microsoft email ${email} does not exists.`, 401);
        }

        logger.log('authProvider', `Sign in with Microsoft oauth email successfully.`);

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async oauthMSBindEmail(@CurrentUser() user: User, @Args('input') input: MsBindEmailInput) {
        const email = await this.microsoftProfileService.getEmailAddressByCode(input.code);
        const resultUser = await this.userService.bindOauthEmail(user, email, UserEmailProvider.MICROSOFT);
        if (!resultUser) {
            throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Microsoft email ${email} already belongs to other user.`, 401);
        }

        logger.log('authProvider', `Bind Microsoft oauth email successfully.`);

        return true;
    }

    // Google Oauth

    @Mutation(() => LoggedUserOutput, { nullable: true })
    async oauthGoogleSignIn(@HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string, @Args('input') input: GoogleSignInInput) {
        const email = await this.googleProfileService.getEmailAddressByCode(input.code);
        const result = await this.userService.signInByOauthEmail(email, UserEmailProvider.GOOGLE, browserKey, userAgent);
        if (!result) {
            throw new AppException(AuthExceptionCode.InexistingEmail, `Google email ${email} does not exists.`, 401);
        }

        logger.log('authProvider', `Sign in with Google oauth email successfully.`);

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async oauthGoogleBindEmail(@CurrentUser() user: User, @Args('input') input: GoogleBindEmailInput) {
        const email = await this.googleProfileService.getEmailAddressByCode(input.code);
        const resultUser = await this.userService.bindOauthEmail(user, email, UserEmailProvider.GOOGLE);
        if (!resultUser) {
            throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Google email ${email} already belongs to other user.`, 401);
        }

        logger.log('authProvider', `Bind Google oauth email successfully.`);

        return true;
    }

    // Linkedin Oauth

    @Mutation(() => LoggedUserOutput, { nullable: true })
    async oauthLinkedinSignIn(@HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string, @Args('input') input: LinkedinSignInInput) {
        const email = await this.linkedinProfileService.getEmailAddressByCode(input.code);
        const result = await this.userService.signInByOauthEmail(email, UserEmailProvider.LINKEDIN, browserKey, userAgent);
        if (!result) {
            throw new AppException(AuthExceptionCode.InexistingEmail, `Linkedin email ${email} does not exists.`, 401);
        }

        logger.log('authProvider', `Sign in with Linkedin oauth email successfully.`);

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async oauthLinkedBindEmail(@CurrentUser() user: User, @Args('input') input: LinkedinBindEmailInput) {
        const email = await this.linkedinProfileService.getEmailAddressByCode(input.code);
        const resultUser = await this.userService.bindOauthEmail(user, email, UserEmailProvider.LINKEDIN);
        if (!resultUser) {
            throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Linkedin email ${email} already belongs to other user.`, 401);
        }

        logger.log('authProvider', `Bind Linkedin oauth email successfully.`);

        return true;
    }
}
