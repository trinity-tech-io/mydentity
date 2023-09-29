import { DeveloperAccessKey } from "@model/developer-access-key/developer-access-key";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const AccessKeyRow: FC<{
  accessKey: DeveloperAccessKey;
}> = ({ accessKey }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row">Existing key: {accessKey.title}, created on {accessKey.createdAt.toLocaleString()}</div>
  )
}