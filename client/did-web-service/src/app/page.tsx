import Link from 'next/link'
import {configService} from "@services/config/config.service";

export default function Home() {
  // TODO:
  // const microsoftUrl = configService.get("backendUrl") + '/microsoft';
  const microsoftUrl = 'http://127.0.0.1:3000/microsoft';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1>DID Web Service</h1>
        <Link href="dashboard" className="btn bg-gray-800 hover:bg-gray-600 text-white px-10 flex-1 m-5">
          <span>Enter app</span>
        </Link>
        <Link href={microsoftUrl} className="btn bg-gray-800 hover:bg-gray-600 text-white px-10 flex-1 m-5">
          <span>Microsoft Sign In</span>
        </Link>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <b>Elastos</b>
          </a>
        </div>
      </div>
    </main>
  )
}
