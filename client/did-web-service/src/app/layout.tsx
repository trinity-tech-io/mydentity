"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { Next13ProgressBar, useRouter } from "next13-progressbar";
import { usePathname } from "next/navigation";
// import { Inter } from 'next/font/google';
import { authRoutes, publicRoutes } from "@/router/routes";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { usePostSignInFlow } from "@services/flow.service";
import { authUser$, authUserReady$ } from "@services/user/user.events";
import { checkIfStringEqualsWith as checkIfStringIsEqualTo, checkIfStringStartsWith } from "@utils/strings";
import "./globals.scss";

// const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }): ReactNode => {
  return (
    <>
      {children}
      <Next13ProgressBar
        style={`
          #nprogress .bar {
            filter: drop-shadow(rgb(51, 255, 255) 0px 0px 5px);
            background: linear-gradient(to left, #0ff 50%, #0083ef 74%, #1e1e1e);
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
          }
        `}
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [userStatusReady] = useBehaviorSubject(authUserReady$);
  const [user] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  // NProgress.configure({ showSpinner: false });

  // const handleProgressStart = () => {
  //   if(!NProgress.isStarted())
  //     NProgress.start()
  // }
  // const handleProgressStop = () => {
  //   if(NProgress.isStarted())
  //     NProgress.done()
  // }

  useEffect(() => {
    if (userStatusReady) {
      if (checkIfStringIsEqualTo(pathname, publicRoutes)) {
        // If the route is a public route, do nothing, page display is allowed
        return;
      }
      else if (!user && !checkIfStringStartsWith(pathname, authRoutes)) {
        // If the user is not authenticated and we are on a route that does NOT require auth (authRoutes array),
        // redirect to entry to sign in
        router.replace("/entry"); // sign in/up page
      }
      /* No - this creates a mess just after authenticating
         else if (user && checkIfStringStartsWith(pathname, authRoutes)) {
         // If user is authenticated and we are on a route that requires auth, go to dashboard
         navigateToPostSignInLandingPage();
       } */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user, userStatusReady]);

  return (
    <html lang="en">
      <body /* className={inter.className} */ suppressHydrationWarning={true}>
        {/* <NextProgress height={4} delay={300} color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))" /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
