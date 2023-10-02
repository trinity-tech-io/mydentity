"use client";
// import { Inter } from 'next/font/google';
import React, { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter, Next13ProgressBar } from "next13-progressbar";
import "./globals.scss";
import { checkIfStringEqualsWith, checkIfStringStartsWith } from "@utils/strings";
import { authRoutes, publicRoutes } from "@/router/routes";
import { getActiveUser } from "@services/user/user.events";

// const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        style={`
          #nprogress .bar {
            filter: drop-shadow(rgb(51, 255, 255) 0px 0px 5px);
            background: linear-gradient(to right, rgb(59, 130, 246), rgb(255 255 255));
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
  const user = getActiveUser();
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
    // handle routes for unauthorized user
    if (checkIfStringEqualsWith(pathname, publicRoutes)) return;
    else if (!user && !checkIfStringStartsWith(pathname, authRoutes))
      router.replace("/entry");
    // handle routes for authorized user
    else if (user && checkIfStringStartsWith(pathname, authRoutes))
      router.replace("/dashboard");
    // handleProgressStop()

    // return () => {
    //   handleProgressStart()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

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
