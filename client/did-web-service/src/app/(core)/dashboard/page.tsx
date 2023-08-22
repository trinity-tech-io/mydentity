'use client'
import { MainButton } from "@components/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { fetchSelfUser } from "@services/user/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { WelcomeBanner } from "./WelcomeBanner";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/RecentActivity";

const Dashboard: FC = () => {
  // get access token from url params.
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const [authUser] = useBehaviorSubject(authUser$());
  const router = useRouter();

  useEffect(() => {
    if (accessToken && accessToken !== '' && refreshToken && refreshToken != '') {
      fetchSelfUser(accessToken, refreshToken).then(user => {
        window.location.replace('/dashboard');
      });
    }
  }, []);

  const signUp = () => {
    router.push("/signup")
  }

  const signIn = () => {
    router.push("/signin")
  }


  return (<>
    {/* Top part */}
    <div className="col-span-full">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Right: Actions */}
        {/* <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <FilterButton align="left" />
          <Datepicker />
          <MainButton title='Add view' leftIcon={
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
          } />
        </div> */}
      </div>
    </div>

    {/* Widgets */}
    {authUser &&
      <>
        <RecentActivityWidget />
        <IdentityListWidget />
      </>
    }

    {/* Not signed in */}
    {!authUser &&
      <div className="col-span-full flex flex-col">
        You want a real web3 identity? You've landed at the right place!<br />
        Continue with one of the following actions:
        <div className="flex flex-row gap-6 mt-4">
          <MainButton onClick={signUp} >Sign up</MainButton>
          <MainButton onClick={signIn} >Sign in</MainButton>
        </div>
      </div>
    }
  </>)
}

export default Dashboard;