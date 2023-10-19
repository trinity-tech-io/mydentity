"use client"
import { unregisterAllConnectors } from '@/app/utils/connectivity-sdk';
// import { Inter } from 'next/font/google';
import { connectivity } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { MydentityConnector } from '@trinitytech/mydentity-connector-browser';
import React, { FC, useEffect } from 'react';

const MydentityLayout: FC<{
  children: React.ReactNode
}> = ({ children }) => {

  useEffect(() => {
    const webConnector = new MydentityConnector({
      webServiceEndpoint: process.env.NEXT_PUBLIC_FRONTEND_URL,
      webServiceAPIEndpoint: process.env.NEXT_PUBLIC_BACKEND_URL,
    });
    connectivity.registerConnector(webConnector);
    connectivity.setApplicationDID("did:elastos:inDxwJsTKBbGkeSJZ5NPA6p8mb3F6i7ytA");

    return () => { unregisterAllConnectors() }
  });

  return children
}

export default MydentityLayout;