'use client';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import AppThemeProvider from '../theming/AppThemeContext';

import { UnlockKeyPromptContextProvider } from '@components/security/unlock-key-prompt/UnlockKeyPrompt';
import { onNewError$ } from '@services/error.service';
import { useToast } from '@services/feedback.service';
import { isUnlockException } from '@services/security/security.service';
import { SnackbarProvider } from 'notistack';
import { filter } from 'rxjs';
import { Header } from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import ThemeRegistry from '../theming/ThemeRegistry';
import { initSync } from '@services/init.service';

initSync();

/* export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
} */

const LayoutCore: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showErrorToast } = useToast();

  // Show API errors as error toast messages
  useEffect(() => {
    const sub = onNewError$.pipe(filter(v => !!v)).subscribe(e => {
      // Filter out this specific weak-exception as this is a master password unlock requirement handled somewhere else.
      if (!isUnlockException(e)) {
        showErrorToast(e.appExceptionCode + " - " + e.message);
      }
    });
    return () => { sub.unsubscribe() };
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
            <div className="grid grid-cols-12 gap-6">
              {children}
            </div>

          </div>
        </main>

      </div>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }): any {

  return (
    <ThemeRegistry>
      <AppThemeProvider>
        <SnackbarProvider>
          <UnlockKeyPromptContextProvider>
            <LayoutCore>{children}</LayoutCore>
          </UnlockKeyPromptContextProvider>
        </SnackbarProvider>
      </AppThemeProvider>
    </ThemeRegistry>
  )
}

