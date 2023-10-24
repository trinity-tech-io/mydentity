"use client";
import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { TextField, Typography } from '@mui/material';
import { useToast } from "@services/feedback.service";
import { authUser$ } from '@services/user/user.events';
import { ChangeEvent, FC, useState } from 'react';

const TAG = "import";

const ImportPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { showSuccessToast, showErrorToast } = useToast();
  const [importing, setImporting] = useState(false);
  const [mnemonic, setMnemonic] = useState<string>(null);

  const handleImportMnemonic: () => void = async () => {
    setImporting(true);

    const identity = await activeUser.get("identity").importRegularIdentity(mnemonic);
    if (identity)
      showSuccessToast("Identity imported");
    else
      showErrorToast("Failed to import identity"); // TODO: catch better errors and show real reason.

    setImporting(false);
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
      <Typography>Note that credentials are not imported in the process.</Typography>

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

      <MainButton onClick={handleImportMnemonic} busy={importing}>Import my DID</MainButton>
      {importing && <Typography>Importing identities, please wait. This take several seconds.</Typography>}
    </div>
  );
};

export default ImportPage;
