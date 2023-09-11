import BrowserIcon from '@assets/images/browser.svg';
import FingerprintIcon from '@assets/images/fingerprint.svg';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Browser } from "@model/browser/browser";
import { FC } from "react";

export const BrowserRow: FC<{
  browser: Browser;
}> = ({ browser }) => {
  const [shadowKey] = useBehaviorSubject(browser?.activeShadowKey$);
  const isCurrentBrowser = browser?.isCurrentBrowser();
  const isPasskeyBound = !!shadowKey;

  return (
    <div className='flex flex-row mt-4 gap-6'>
      <BrowserIcon width={40} />
      <div className='flex flex-col ml-4'>
        <div className='font-bold'>{browser.name} {isCurrentBrowser && <span className='font-medium'>(This browser)</span>}</div>
        <div className='italic text-xs'>Last used: {browser.lastUsedAt.toLocaleString()}</div>
      </div>
      {isPasskeyBound &&
        <div className='flex flex-row gap-2 items-center text-white px-4 py-1 rounded-lg text-sm' style={{ backgroundColor: "var(--primary-color)" }}>
          <FingerprintIcon height={30} color="#44CC44" />
          Bound to passkey
        </div>
      }
    </div>
  )
}