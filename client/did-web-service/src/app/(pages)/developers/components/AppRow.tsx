import { Identity } from "@model/identity/identity";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const AppRow: FC<{
  application: Identity;
}> = ({ application }) => {
  const router = useRouter();

  const openApp = (): void => {
    router.push("/developers/application/" + application.did);
  }

  return (
    <div className="flex flex-row cursor-pointer" onClick={openApp}>App stuff {application.did}</div>
  )
}