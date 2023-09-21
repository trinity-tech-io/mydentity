import {User} from "@model/user/user";
import {UserEmailDTO} from "@model/user-email/user-email.dto";

export class UserEmail {
    id: string;
    userId: string;
    email: string;
    createdAt: string;
    user: User;

    public static fromJson(json: UserEmailDTO, user: User=null): UserEmail {
        const email: UserEmail = Object.assign(new UserEmail(), json);
        email.user = user;
        return email;
    }
}