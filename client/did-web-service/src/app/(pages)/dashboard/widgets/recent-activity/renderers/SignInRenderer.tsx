import AccountIcon from '@assets/images/account.svg';
import { LettersAvatar } from "@components/generic/LettersAvatar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Activity } from "@model/activity/activity";
import { Avatar } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { FC } from "react";

export const SignInRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [userNameInitials] = useBehaviorSubject(activeUser?.nameInitials$);

  /* if (this.userEmailProvider == UserEmailProvider.RAW)
      return 'Signed in with raw email.';
  else if (this.userEmailProvider === UserEmailProvider.MICROSOFT)
      return 'Signed in with Microsoft oauth email.';
  return `Signed in with unhandled type ${this.userEmailProvider}.`; */

  return (
    <div className='flex flex-row gap-2 items-center'>
      {activeUser ? (
        <LettersAvatar text={userNameInitials} width={20} height={20} />) : (
        <Avatar sx={{ ml: 0, width: 24, height: 24 }}>
          <AccountIcon width={24} />
        </Avatar>
      )}
      <div>
        You signed in with email address {activity.userEmailAddressStr} from browser {activity.browserNameStr}
      </div>
    </div>
  )
}
