import EmailPrintIcon from '@assets/images/email.svg';
import AccountIcon from '@assets/images/account.svg';
import FingerPrintIcon from '@assets/images/fingerprint.svg';

export const defaultProfileIcons:{[profileInfoKey: string]: JSX.Element} = {
    'name': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'gender': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'email': <EmailPrintIcon style={{ width: 35, height: 35 }}/>,
    'birthDate': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'fingerPrint': <FingerPrintIcon style={{ width: 35, height: 35 }}/>, // TODO: TEST
    'default':<AccountIcon style={{ width: 35, height: 35 }}/>   
    // TODO： ADD MORE
}