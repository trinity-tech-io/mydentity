import AccountIcon from '@assets/images/account.svg';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Credential } from "@model/credential/credential";
import { Avatar } from "@mui/material";
import { FC } from "react";

/**
 * Enhanced "avatar" component that displays either the representative picture of a credential,
 * or a default avatar.
 */
export const CredentialAvatar: FC<{
  credential?: Credential;
  width?: number;
  height?: number;
}> = ({ credential, width = 120, height = 120 }) => {
  const [representativeIconPath] = useBehaviorSubject(credential?.representativeIcon$);

  return (
    <Avatar sx={{ width, height }} src={representativeIconPath}>
      {!representativeIconPath && <AccountIcon style={{ width: '70%' }} />}
    </Avatar>
  )
}