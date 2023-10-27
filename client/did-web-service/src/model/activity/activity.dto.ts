import { BrowserDTO } from "@model/browser/browser.dto";
import { UserEmailDTO } from "@model/user-email/user-email.dto";
import { IdentityDTO } from "@model/identity/identity.dto";
import { UserDTO } from "@model/user/user.dto";

export type ActivityDto = {
    id: string;
    type: string;
    user?: UserDTO;
    userEmail?: UserEmailDTO;
    userEmailProvider?: string;
    userEmailAddress?: string;
    identity?: IdentityDTO;
    identityDid?: string;
    credentialsCount?: number;
    appDid?: string;
    browser?: BrowserDTO;
    browserName?: string;
    createdAt: string;
}