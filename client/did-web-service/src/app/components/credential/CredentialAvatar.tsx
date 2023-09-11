import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Credential } from "@model/credential/credential";
import { Avatar } from "@mui/material";
import { FC } from "react";
import Image from 'next/image';

/**
 * Enhanced "avatar" component that displays either the representative picture of a credential,
 * or a default avatar.
 */
export const CredentialAvatar: FC<{
  credential?: Credential;
  width?: number;
  height?: number;
}> = ({ credential, width = 60, height = 60 }) => {
  const [representativeIconPath] = useBehaviorSubject(credential?.representativeIcon$);
  return (
    <Avatar sx={{ width, height } }>
      {typeof representativeIconPath === 'string' ? (
        <Image src={representativeIconPath} alt="" width={width-20} height={height-20} />
      ) : (
        representativeIconPath
      )}
    </Avatar>
  )
}