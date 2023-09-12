import BrowserIcon from '@assets/images/browser.svg';
import FingerprintIcon from '@assets/images/fingerprint.svg';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Browser } from "@model/browser/browser";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useToast } from '@services/feedback.service';
import { authUser$ } from '@services/user/user.events';
import { FC, MouseEvent } from 'react';

export const BrowserRow: FC<{
  browser: Browser;
}> = ({ browser }) => {
  const [shadowKey] = useBehaviorSubject(browser?.activeShadowKey$);
  const isCurrentBrowser = browser?.isCurrentBrowser();
  const isPasskeyBound = !!shadowKey;

  const [authUser] = useBehaviorSubject(authUser$);
  const browserFeature = authUser?.get("browser");

  const { showSuccessToast, showErrorToast } = useToast();

  const onDeleteClicked = async (event: MouseEvent, browser: Browser): Promise<void> => {
    event.stopPropagation(); // Prevent event propagation to the cell
    event.preventDefault(); //

    // Deletion
    const successfulDeletion = await browserFeature.deleteBrowser(browser.id);
    if (successfulDeletion) {
      showSuccessToast('Browser has been deleted!');
    } else {
      showErrorToast('Failed to delete the browser...');
    }
  }

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
      {!isCurrentBrowser &&
        <div className="text-right">
          <IconButton aria-label="delete" onClick={(e): Promise<void> => onDeleteClicked(e, browser)}>
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      }
    </div>
  )
}