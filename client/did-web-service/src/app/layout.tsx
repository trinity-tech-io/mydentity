"use client";
// import { Inter } from 'next/font/google';
import React, { FC, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './globals.scss';
import { checkIfStringStartsWith } from '@utils/strings';
import { authRoutes, publicRoutes } from '@/router/routes';
import { getActiveUser } from '@services/user/user.events';

// const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = getActiveUser();
  useEffect(() => {
    // handle routes for unauthorized user
    if(!user && !checkIfStringStartsWith(pathname, [...authRoutes, ...publicRoutes]))
      router.replace('entry')
    // handle routes for authorized user
    else if(user && checkIfStringStartsWith(pathname, authRoutes))
      router.replace('dashboard')
  }, [pathname]);

  return (
    <html lang="en">
      <body /* className={inter.className} */ suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;