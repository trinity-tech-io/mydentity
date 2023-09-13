import EmailPrintIcon from '@assets/images/email.svg';
import AccountIcon from '@assets/images/account.svg';
import FingerPrintIcon from '@assets/images/fingerprint.svg';

export const defaultProfileIcons:{[profileInfoKey: string]: JSX.Element} = {
    'name': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'email': <EmailPrintIcon style={{ width: 35, height: 35 , color:'white'}}/>,
    'birthDate': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'nationality': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'gender': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'telephone': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'nickname': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'birthPlace': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'occupation': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'education': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'interests': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'description': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'url': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'discord': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'linkedin': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'facebook': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'instagram': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'twitter': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'snapchat': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'telegram': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'wechat': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'weibo': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'twitch': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'elaAddress': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'wallet': <AccountIcon style={{ width: 35, height: 35 }}/>,
    'default':<AccountIcon style={{ width: 35, height: 35 }}/>   
    // TODO： Replace icon
}
