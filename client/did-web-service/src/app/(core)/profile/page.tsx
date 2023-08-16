'use client'
import { FC, createRef, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import { Stack, Typography } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { activeIdentity$ } from "@services/identity/identity.events";
import { Credential } from "@model/credential/credential";
import moment from "moment";
import { logger } from "@services/logger";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile: FC = () => {
  const TAG = "ProfilePage";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const [currentNameCredential, setCurrentNameCredential] = useState<Credential>(null);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const userNameRef = createRef<HTMLInputElement>()
  const [updateCredentialSuccessOpen, setUpdateCredentialSuccessOpen] = useState(false);

  useEffect(() => {
    if(credentials){
      const nameCredential = getNameCredential(credentials);
      setCurrentNameCredential(nameCredential) ;
      const name = getNameValueFromCredential(nameCredential);
      setUserName(name);
    }
  },[credentials]);

  const getNameValueFromCredential = (credential: Credential): string => {
    return getValueFromCredential(credential,'name');
  }

  const getNameCredential = (credentials: Credential[]): Credential => {
    return getSpecialCredentials(credentials, 'name');
  }

  const getSpecialCredentials = (credentials: Credential[], fragment: string): Credential => {
    let matchingCredential = credentials.find(credential => {
      if (!credential|| !credential.verifiableCredential)
        return '';
      const didUrl = credential.verifiableCredential.getId();
      if (didUrl) {
        return didUrl.getFragment() == fragment;
      }
    });

    if (!matchingCredential||!matchingCredential.verifiableCredential)
      return null;
    return matchingCredential;
  }

  const getValueFromCredential = (credential: Credential, propertyName: string): string => {
    if (!credential || !credential.verifiableCredential || !credential.verifiableCredential.getSubject())
      return '';
    return credential.verifiableCredential.getSubject().getProperty(propertyName);
  }

  const getCredentialId = (credential: Credential): string => {
    if(!credential && !credential.verifiableCredential && !credential.verifiableCredential.getId())
      return '';
    return credential.verifiableCredential.getId().toString()
  }
  
  const updateNameCredential = async (currentNameCredential: Credential, newName: string) => {
    const credentialId = getCredentialId(currentNameCredential);
    const types: string[] = [
      "https://ns.elastos.org/credentials/v1#SelfProclaimedCredential",
      "https://ns.elastos.org/credentials/profile/name/v1#NameCredential"
    ];
    const expirationDate = moment().add(5, "years").toDate();
    const prop = {
      "name": newName
    }
    logger.log(TAG, "Update name credential params", credentialId, types, expirationDate, prop);
    try {
      await activeIdentity?.get("credentials").deleteCredential(credentialId);
      await activeIdentity?.get("credentials").createCredential(credentialId, types, expirationDate, prop);
      setUpdateCredentialSuccessOpen(true);
    } catch (error) {
      logger.error(TAG, error);
    }
  }

  async function handleClick() {
    setLoading(true);
    const newUserName = userNameRef.current.value;
    if (!newUserName || userName == newUserName){
      setLoading(false)
      return ;
    }

    await updateNameCredential(currentNameCredential, newUserName);
    setLoading(false);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setUpdateCredentialSuccessOpen(false);
  };

  return (<div className="col-span-full">
    <Box
      mt={2}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

    <Avatar  src="/assets/images/account.svg" sx={{ ml:2, width: 120, height: 120 }}/>

    <Typography ml={2} my={3} variant="h5">About me</Typography>
      <TextField
        label="Name"
        defaultValue={userName}
        inputRef={userNameRef}
        variant="outlined"
        size="small"
        InputLabelProps={{ shrink: true }}
        autoFocus
      />

      <div  className="ml-2 mt-1 mb-3">
        <LoadingButton
            color="primary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
          <span>Save</span>
        </LoadingButton>
      </div>
    </Box>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={updateCredentialSuccessOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Update credential success
        </Alert>
      </Snackbar>
    </Stack>
    Here is the active identity profile. Only information for the active DID is shown. A profile is a user friendly way of displaying a few base credentials such as name, birth date, nationality. Only for VCs with known type.
    <br /><br />
    We want to do like in essentials here: we have a hardcoded list of basic credential types. We can edit those credentials in a UI friendly way (user never sees the credentials) and when a profile entry is edited, this creates a new VC automatically.
    <br /><br />
    Next to each profile entry we should also show a small icon to open the associate credential detail page.
    <br /><br />
    The user avatar should be saved to hive but we need to wait to get the hive service ready for that.
  </div>)
}

export default Profile;