'use client';

import { FC } from "react";
import {authUser$, getActiveUser} from "@services/user/user.events";
import {useSearchParams} from "next/navigation";
import {bindOauthEmail} from "@services/user/user.service";
import {useBehaviorSubject} from "@hooks/useBehaviorSubject";

const BindOauth: FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const existingAccessToken = localStorage.getItem('access_token')
  if (existingAccessToken && existingAccessToken !== '') {
    if (email) {
      // bindOauthEmail(email).then(() => {
      //   window.location.replace('/account/security');
      // });
      window.location.replace('/account/security');
    }
  } else {
    window.location.replace(`/dashboard?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }

  return (<div className="col-span-full">
    Here is the active identity profile. Only information for the active DID is shown. A profile is a user friendly way of displaying a few base credentials such as name, birth date, nationality. Only for VCs with known type.
    <br /><br />
    We want to do like in essentials here: we have a hardcoded list of basic credential types. We can edit those credentials in a UI friendly way (user never sees the credentials) and when a profile entry is edited, this creates a new VC automatically.
    <br /><br />
    Next to each profile entry we should also show a small icon to open the associate credential detail page.
    <br /><br />
    The user avatar should be saved to hive but we need to wait to get the hive service ready for that.
  </div>)
}

export default BindOauth;