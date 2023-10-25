"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Grid, Typography } from "@mui/material";
import { activeIdentity$ } from "@services/identity/identity.events";
import { FC } from "react";
import { ApplicationRow } from "./ApplicationRow";
import Headline from "@components/layout/Headline";
import ApplicationBox from "./components/ApplicationBox";

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

      {interactingApplications?.length == 0 && (
        <Typography variant="h6" align="center" sx={{ pt: 2 }}>
          No application has interacted with this identity yet.
        </Typography>
      )}

      {interactingApplications?.length > 0 && (
        <Grid container spacing={2}>
          {interactingApplications?.map((app, _id) => (
            <Grid item xs={12} sm={6} key={_id}>
              <ApplicationBox application={app} />
            </Grid>
          ))}
        </Grid>
      )}

      {interactingApplications?.length > 0 && (
        <>
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
