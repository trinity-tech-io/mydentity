"use client";
import { FC } from "react";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";
import { MainButton } from "@components/generic/MainButton";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import AppSection from "../components/AppSection";
import { Grid } from "@mui/material";

const ApplicationsPage: FC = () => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const [appIdentities] = useBehaviorSubject(
    identityFeature?.applicationIdentities$
  );
  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["developers", "application-details"]} /> */}
      <Headline
        title="Developer applications"
        description="Developer applications that created with your identity. These applications are instrumental in communicating with the identity framework to provide enriched services and tailored experiences."
        showBg={true}
      />
      {appIdentities && (
        <Grid container spacing={2}>
          {appIdentities.map((appIdentity) => (
            <Grid item xs={12} sm={6} xl={4} key={appIdentity.did}>
              <AppSection appIdentity={appIdentity} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ApplicationsPage;
