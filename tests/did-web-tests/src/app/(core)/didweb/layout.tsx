"use client"
import { unregisterAllConnectors } from '@/app/utils/connectivity-sdk';
// import { Inter } from 'next/font/google';
import { connectivity } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { DIDWebConnector } from '@trinitytech/did-web-connector-client-browser';
import React, { FC, useEffect } from 'react';

const DIDWebLayout: FC<{
  children: React.ReactNode
}> = ({ children }) => {

  useEffect(() => {
    const webConnector = new DIDWebConnector({
      webServiceEndpoint: process.env.NEXT_PUBLIC_FRONTEND_URL,
      webServiceAPIEndpoint: process.env.NEXT_PUBLIC_BACKEND_URL,
    });
    connectivity.registerConnector(webConnector);

    return () => { unregisterAllConnectors() }
  });

  return children
}

export default DIDWebLayout;