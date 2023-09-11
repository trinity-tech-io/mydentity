import AccountIcon from '@assets/images/account.svg';
import { LettersAvatar } from '@components/generic/LettersAvatar';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import { Avatar } from "@mui/material";
import { initialsString } from '@utils/strings';
import Image from 'next/image';
import { FC } from "react";

/**
 * Enhanced "avatar" component that displays either the representative picture of an identity,
 * or a default avatar.
 */
export const IdentityAvatar: FC<{
  identity?: Identity;
  width?: number;
  height?: number;
}> = ({ identity, width = 60, height = 60 }) => {
  const [name] = useBehaviorSubject(identity?.get("profile").name$)
  const [representativeIconPath] = useBehaviorSubject(identity?.get("profile").icon$);

  return (<>
    {representativeIconPath ? (
      /* If we have a representative icon (avatar defined), show it */
      <Avatar sx={{ width, height }}>
        {representativeIconPath && <Image src={representativeIconPath} alt="" width={width} height={height} />}
      </Avatar>
    ) : (
      <>
        {/* If no avatar, but have a name, show the initials */}
        {!name && <AccountIcon width={width} height={height} />}
        {/*  If not avatar nor name, show a default head icon */}
        {name && <LettersAvatar text={initialsString(name)} />}
      </>
    )}
  </>)
}