import { DeveloperAccessToken } from "@model/developer-access-token/developer-access-token";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const AccessTokenRow: FC<{
  accessToken: DeveloperAccessToken;
}> = ({ accessToken }) => {
  const router = useRouter();


  return (
    <div className="flex flex-row">Existing key: {accessToken.title}, created on {accessToken.createdAt.toLocaleString()}</div>
  )
}