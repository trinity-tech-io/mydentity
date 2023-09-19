"use client";
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { FC } from 'react';
import Barcode from 'react-barcode'

const Home: FC = () => {
  const router = useRouter()
  const BarCodeOptions = {
    displayValue: false,
    margin: 0,
    background: '#ffffffff00',
    lineColor: '#ffffff',
    height: 40,
    width: 1.3
  }

  return (
    <main className="flex min-h-screen">
      <div className="w-2/5 bg-black pt-24 px-8 flex justify-center">
        <div className="max-w-md flex flex-col">
          <div className="flex-1">
            <h1 className="text-white h1">
              Take back control of your
            </h1>
            <div className="inline-flex flex-col pt-2">
              <Barcode value="identity" {...BarCodeOptions}/>
              <h5 className="text-white h5 stretch text-lg">i d e n t i t y</h5>
            </div>
            <p className="text-gray-300 text-xl">
              In an era of increasing data breaches, decentralized credentials offer a robust solution for safeguarding personal information.
            </p>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="inline-flex flex-col pt-2">
                <Barcode value="Decentralized Srv" {...BarCodeOptions} height={20}/>
                <p className="text-white stretch text-xs">Decentralized Identity Web Service</p>
              </div>
            </div>
            <div>
              <div className="inline-flex flex-col pt-2">
                <Barcode value="Elastos" {...BarCodeOptions} height={20}/>
                <p className="text-white stretch text-xs">Powered by Elastos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" style={{background: `url('./landing-bg.png') no-repeat center center / cover`}}>
        <div className="text-right p-7">
          <Button
            className="flex-1 bg-black"
            variant="contained"
            onClick={() => {
              router.push('dashboard')
            }}
          >
            LAUNCH APP
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Home;