import { InteractingApplicationAvatar } from "@components/applications/InteractingApplicationAvatar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { FC } from "react";

export const RecentApp: FC<{
  application: IdentityInteractingApplication;
}> = ({ application }) => {
  const [appName] = useBehaviorSubject(application?.interactingApplication?.name$);

  return (
    <tr >
      <td className="p-2 whitespace-nowrap flex flex-row items-center gap-2">
        <InteractingApplicationAvatar application={application.interactingApplication} size={40} />
        <div className="flex flex-col">
          <div className="font-bold">{appName}</div>
          <div>{application.interactingApplication.did}</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-green-500">xxx</div>
      </td>
    </tr>
  );
}