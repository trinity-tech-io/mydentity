"use client"
import { unregisterAllConnectors } from '@/app/utils/connectivity-sdk';
// import { Inter } from 'next/font/google';
import { connectivity } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { EssentialsConnector } from '@elastosfoundation/essentials-connector-client-browser';
import React, { FC, useEffect } from 'react';

const EssentialsLayout: FC<{
  children: React.ReactNode
}> = ({ children }) => {

  useEffect(() => {
    const essentialsConnector = new EssentialsConnector();
    connectivity.registerConnector(essentialsConnector);

    return () => { unregisterAllConnectors() }
  })

  return children
}

export default EssentialsLayout;