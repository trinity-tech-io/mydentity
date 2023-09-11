import EmailPrintIcon from '@assets/images/email.svg';
import AccountIcon from '@assets/images/account.svg';
import FingerPrintIcon from '@assets/images/fingerprint.svg';

export const defaultProfileIcons:{[profileInfoKey: string]: JSX.Element} = {
    'Name': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'Gender': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'Email': <EmailPrintIcon style={{ width: 35, height: 35 }}/>,
    'BirthDate': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'finger-print': <FingerPrintIcon style={{ width: 35, height: 35 }}/>,
    'default':<AccountIcon style={{ width: 35, height: 35 }}/>   
    // TODO： ADD MORE
}