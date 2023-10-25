"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Typography } from "@mui/material";
import { activeIdentity$ } from "@services/identity/identity.events";
import { FC } from "react";
import { ApplicationRow } from "./ApplicationRow";
import Headline from "@components/layout/Headline";

const Applications: FC = () => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [interactingApplications] = useBehaviorSubject(
    activeIdentity?.applications().applications$
  );

  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["applications"]} /> */}
      <Headline
        title="Applications"
        description="Applications that interacted with your identity. These applications are instrumental in communicating with the identity framework to provide enriched services and tailored experiences."
        showBg={true}
      />

      <Typography variant="h5">Applications</Typography>

      {interactingApplications?.length === 0 && (
        <div>No application has interacted with this identity yet.</div>
      )}
      {interactingApplications?.length > 0 && (
        <>
          <Typography>Applications this identity interacted with</Typography>
          <div className="mt-8">
            {interactingApplications?.map((app, i) => (
              <ApplicationRow key={i} application={app} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
