"use client";
import { MainButton } from "@components/generic/MainButton";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { AppException } from "@model/exceptions/app-exception";
import { DIDExceptionCode } from "@model/exceptions/exception-codes";
import {
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  ClipboardEvent,
  ClipboardEventHandler,
  FC,
  MutableRefObject,
  useRef,
  useState,
} from "react";

const TAG = "import";

const ImportPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { showSuccessToast, showErrorToast } = useToast();
  const [importing, setImporting] = useState(false);
  const [mnemonic, setMnemonic] = useState<string>(null);
  const [phrases, setPhrases] = useState<string[]>([]);
  const [error, setError] = useState<string>(null);
  const phraseRef = useRef([]);
  const router = useRouter();

  const handleImportMnemonic: () => void = async () => {
    setError(null);
    setImporting(true);

    try {
      const identities = await activeUser
        .get("identity")
        .importIdentity(mnemonic);
      if (identities) {
        if (identities.length === 0)
          showSuccessToast(
            "NOTE: mnemonic imported, but no identity found inside"
          );
        else if (identities.length === 1) showSuccessToast("Identity imported");
        else showSuccessToast(`${identities.length} identities imported`);

        // Back to identity list to show the imported identities
        router.replace("/identities");
      } else showErrorToast("Failed to import identity"); // TODO: catch better errors and show real reason.
    } catch (e) {
      const appException = e as AppException;
      switch (appException.appExceptionCode) {
        case DIDExceptionCode.NetworkError:
          setError("Network error, please try again later");
          break;
        case DIDExceptionCode.SyncError:
          setError(
            "Error while synchronizing your identities, please try again later"
          );
          break;
        case DIDExceptionCode.InvalidMnemonic:
          setError(
            "This mnemonic is invalid. Make sure to type your 12 words correctly"
          );
          break;
        default:
          setError("Unknown error");
      }
    } finally {
      setImporting(false);
    }
  };

  const onMnemonicChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMnemonic(event.currentTarget?.value);
  };

  const handlePastePhrases = (e: ClipboardEvent, index: number): void => {
    e.stopPropagation();
    e.preventDefault();

    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const splitPhrases = pastedData
      .split(" ")
      .filter((str) => str.length > 0)
      .map((str) => str.trim());
    splitPhrases.slice(0, 12).forEach((phrase, _id) => {
      if (phraseRef.current[_id]) phraseRef.current[_id].value = phrase;
    });
  };

  const handleChangePhrase: ChangeEventHandler = (e) => {};

  if (!mounted) return null;

  return (
    <div>
      <Headline
        title="Import Identity"
        description="Do you already have a DID from another app? You can import it by entering the 12 mnemonic words linked to it.
        Please note that only published credentials will be included in the import process."
        showBg={true}
      />
      <Stack alignItems="center" spacing={2} sx={{ pt: { xs: 2, sm: 4 } }}>
        <Typography variant="h5">Enter 12 Words</Typography>
        <div className="max-w-xl w-full">
          <Grid container spacing={2}>
            {Array(12)
              .fill(0)
              .map((_, _id) => {
                const getRef = (element: MutableRefObject<any>): void => {
                  phraseRef.current.push(element);
                };
                return (
                  <Grid item xs={4} sm={3} md={2} key={_id}>
                    <OutlinedInput
                      size="small"
                      onPaste={(e): void => {
                        handlePastePhrases(e, _id);
                      }}
                      inputProps={{
                        ref: getRef,
                      }}
                      onChange={handleChangePhrase}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </Stack>

      <div className="my-8">
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

      <MainButton
        onClick={handleImportMnemonic}
        busy={importing}
        disabled={!mnemonic}
      >
        Import my DID
      </MainButton>
      {importing && (
        <Typography>
          Importing identities, please wait. This takes several seconds.
        </Typography>
      )}
      {error && <Typography color="red">{error}</Typography>}
    </div>
  );
};

export default ImportPage;
