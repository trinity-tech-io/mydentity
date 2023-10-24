"use client";
import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { AppException } from '@model/exceptions/app-exception';
import { DIDExceptionCode } from '@model/exceptions/exception-codes';
import { TextField, Typography } from '@mui/material';
import { useToast } from "@services/feedback.service";
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useState } from 'react';

const TAG = "import";

const ImportPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { showSuccessToast, showErrorToast } = useToast();
  const [importing, setImporting] = useState(false);
  const [mnemonic, setMnemonic] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const router = useRouter();

  const handleImportMnemonic: () => void = async () => {
    setError(null);
    setImporting(true);

    try {
      const identities = await activeUser.get("identity").importIdentity(mnemonic);
      if (identities) {
        if (identities.length === 0)
          showSuccessToast("NOTE: mnemonic imported, but no identity found inside");
        else if (identities.length === 1)
          showSuccessToast("Identity imported");
        else
          showSuccessToast(`${identities.length} identities imported`);

        // Back to identity list to show the imported identities
        router.replace("/identities");
      }
      else
        showErrorToast("Failed to import identity"); // TODO: catch better errors and show real reason.
    }
    catch (e) {
      const appException = e as AppException;
      switch (appException.appExceptionCode) {
        case DIDExceptionCode.NetworkError: setError("Network error, please try again later"); break;
        case DIDExceptionCode.SyncError: setError("Error while synchronizing your identities, please try again later"); break;
        case DIDExceptionCode.InvalidMnemonic: setError("This mnemonic is invalid. Make sure to type your 12 words correctly"); break;
        default: setError("Unknown error");
      }
    }
    finally {
      setImporting(false);
    }
  };

  const onMnemonicChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMnemonic(event.currentTarget?.value);
  };

  if (!mounted)
    return null;

  return (
    <div className="flex flex-col mt-12">
      <Typography variant='h4'>Import</Typography>
      <Typography>Already have a DID in another app? Input your 12 DID mnemonic words to import it.</Typography>
      <Typography>Note that only published credentials are imported in the process.</Typography>

      <div className='my-8'>
        <TextField
          autoFocus
          onChange={onMnemonicChange}
          margin="dense"
          label="Your 12 mnemonic words"
          variant="outlined"
          autoComplete="off"
          disabled={importing}
        />
      </div>

      <MainButton onClick={handleImportMnemonic} busy={importing} disabled={!mnemonic}>Import my DID</MainButton>
      {importing && <Typography>Importing identities, please wait. This takes several seconds.</Typography>}
      {error && <Typography color="red">{error}</Typography>}
    </div>
  );
};

export default ImportPage;
