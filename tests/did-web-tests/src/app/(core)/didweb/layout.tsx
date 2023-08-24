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
      webServiceEndpoint: "http://127.0.0.1:4000",
      webServiceAPIEndpoint: "http://127.0.0.1:3000",
    });
    connectivity.registerConnector(webConnector);

    return () => { unregisterAllConnectors() }
  })

  return children
}

export default DIDWebLayout;