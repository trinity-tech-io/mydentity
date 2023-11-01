import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Avatar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";

/**
 * Enhanced "avatar" component that displays either the representative picture of a credential,
 * or a default avatar.
 */
export const CredentialAvatar: FC<{
  credential?: Credential;
  width?: number;
  height?: number;
  className?: string;
}> = ({ credential, width = 60, height = 60, className }) => {
  const [representativeIconPath] = useBehaviorSubject(
    credential?.representativeIcon$
  );
  const theme = useTheme();
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const widthRate = (lessThanSmall && 0.75) || (smallToMid && 0.9) || 1;

  return (
    <Avatar
      sx={{
        width: width * widthRate,
        height: height * widthRate,
        padding:
          typeof representativeIconPath === "string"
            ? 0
            : `${Math.floor(width * widthRate / 8) * 0.125}rem`,
        backgroundColor: "#7575754d",
      }}
      className={clsx(className)}
    >
      {typeof representativeIconPath === "string" ? (
        <Image
          src={representativeIconPath}
          alt=""
          width={width * widthRate}
          height={height * widthRate}
        />
      ) : (
        representativeIconPath
      )}
    </Avatar>
  );
};
