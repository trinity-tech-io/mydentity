'use client'
import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { WelcomeBanner } from "./WelcomeBanner";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/RecentActivity";

const Dashboard: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  const { mounted } = useMounted();

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  const signUp = (): void => {
    router.push("/signup")
  }

  const signIn = (): void => {
    router.push("/signin")
  }

  return (<>
    {/* Top part */}
    <div className="col-span-full">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center">

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

    {!mounted && <VerticalStackLoadingCard className="col-span-full" />}

    {mounted && <>
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
    </>}
  </>)
}

export default Dashboard;