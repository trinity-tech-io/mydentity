"use client";
import TrinityLogo from "@assets/images/TrinityLogo.svg";
import { Header } from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import { UnlockKeyPromptContextProvider } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { styled } from "@mui/material";
import { onNewError$ } from "@services/error.service";
import { useToast } from "@services/feedback.service";
import { initSync } from "@services/init.service";
import { isUnlockException } from "@services/security/security.service";
import { checkIfStringStartsWith } from "@utils/strings";
import { usePathname } from "next/navigation";
import { SnackbarProvider } from "notistack";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { filter } from "rxjs";
import AppThemeProvider from "../theming/AppThemeContext";
import ThemeRegistry from "../theming/ThemeRegistry";

initSync();

const EntryRoutes = ["/entry", "/register", "/signin"];
/* export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
} */

const LayoutCore: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showErrorToast } = useToast();

  // Show API errors as error toast messages
  useEffect(() => {
    const sub = onNewError$.pipe(filter((v) => !!v)).subscribe((e) => {
      // Filter out this specific weak-exception as this is a master password unlock requirement handled somewhere else.
      if (!isUnlockException(e)) {
        showErrorToast(e.appExceptionCode + " - " + e.message);
      }
    });
    return () => {
      sub.unsubscribe();
    };
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-700">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">
            {/* Main content */}
            <div className="grid grid-cols-12 gap-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

const EllipseBg = styled("div")(({ theme }) => ({
  bottom: 0,
  right: 0,
  height: "60%",
  background:
    "linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 40%), transparent)",
  borderTopLeftRadius: "100%",
}));

const EntryLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isSigninPage = pathname.startsWith("/signin");
  return (
    <main
      className={`container relative ${isSigninPage ? "bg-black" : "landing-bg"
        } min-h-screen min-w-full px-4 pt-8 pb-[86px] md:px-12 md:pt-12`}
    >
      {isSigninPage && (
        <EllipseBg className="absolute opacity-20 w-full md:w-1/2" />
      )}
      <div className="relative">{children}</div>
      <div className="absolute left-0 bottom-0 w-full">
        <div className="flex justify-end p-7">
          <TrinityLogo />
        </div>
      </div>
    </main>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();
  const LayoutMain = checkIfStringStartsWith(pathname, EntryRoutes)
    ? EntryLayout
    : LayoutCore;
  return (
    <ThemeRegistry>
      <AppThemeProvider>
        <SnackbarProvider>
          <UnlockKeyPromptContextProvider>
            <LayoutMain>{children}</LayoutMain>
          </UnlockKeyPromptContextProvider>
        </SnackbarProvider>
      </AppThemeProvider>
    </ThemeRegistry>
  );
}
