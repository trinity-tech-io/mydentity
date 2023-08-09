"use client"
import { unregisterAllConnectors } from '@/app/utils/connectivity-sdk';
// import { Inter } from 'next/font/google';
import { connectivity } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { DIDWebConnector } from '@trinity-tech/did-web-connector';
import React, { FC, useEffect } from 'react';

const DIDWebLayout: FC<{
  children: React.ReactNode
}> = ({ children }) => {

  useEffect(() => {
    const webConnector = new DIDWebConnector({
      webServiceEndpoint: "http://localhost:4000",
      webServiceAPIEndpoint: "http://localhost:3000",
    });
    connectivity.registerConnector(webConnector);

    return () => { unregisterAllConnectors() }
  })

  return children
}

export default DIDWebLayout;