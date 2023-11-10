import EmailPrintIcon from "@assets/images/email.svg";
import AccountIcon from "@assets/images/account.svg";
import GenderIcon from "@assets/images/gender.svg";
import NameIcon from "@assets/images/user.svg";
import NationIcon from "@assets/images/flag.svg";
import PlaceIcon from "@assets/images/place.svg";
import EducateIcon from "@assets/images/educate.svg";
import BusinessIcon from "@assets/images/business.svg";
import TelephoneIcon from "@assets/images/telephone.svg";
import InstagramIcon from "@assets/images/instagram.svg";
import InterestIcon from "@assets/images/interest.svg";
import DescriptionIcon from "@assets/images/description.svg";
import LinkIcon from "@assets/images/link.svg";
import DiscordIcon from "@assets/images/discord.svg";
import LinkedinIcon from "@assets/images/linkedin.svg";
import FacebookIcon from "@assets/images/facebook.svg";
import TwitterIcon from "@assets/images/twitter.svg";
import SnapchatIcon from "@assets/images/snapchat.svg";
import TelegramIcon from "@assets/images/telegram.svg";
import WechatIcon from "@assets/images/wechat.svg";
import WeiboIcon from "@assets/images/weibo.svg";
import TwitchIcon from "@assets/images/twitch.svg";
import ElaAddressIcon from "@assets/images/ela-address.svg";
import WalletIcon from "@assets/images/wallet.svg";
import DateIcon from "@assets/images/date.svg";

export const defaultProfileIcons: { [profileInfoKey: string]: JSX.Element } = {
  name: <AccountIcon style={{ width: 40, height: 40 }} />,
  email: <EmailPrintIcon style={{ width: 30, height: 30 }} />,
  birthDate: <DateIcon style={{ width: 35, height: 35 }} />,
  nationality: <NationIcon style={{ width: 32, height: 32 }} />,
  gender: <GenderIcon style={{ width: 30, height: 30 }} />,
  telephone: <TelephoneIcon style={{ width: 32, height: 32 }} />,
  nickname: <NameIcon style={{ width: 40, height: 40 }} />,
  birthPlace: <PlaceIcon style={{ width: 35, height: 35 }} />,
  occupation: <BusinessIcon style={{ width: 35, height: 35 }} />,
  education: <EducateIcon style={{ width: 35, height: 35 }} />,
  interests: <InterestIcon style={{ width: 30, height: 30 }} />,
  description: <DescriptionIcon style={{ width: 30, height: 30 }} />,
  url: <LinkIcon style={{ width: 37, height: 37 }} />,
  discord: <DiscordIcon style={{ width: 35, height: 35 }} />,
  linkedin: <LinkedinIcon style={{ width: 45, height: 45 }} />,
  facebook: <FacebookIcon style={{ width: 45, height: 45 }} />,
  instagram: <InstagramIcon style={{ width: 45, height: 45 }} />,
  twitter: <TwitterIcon style={{ width: 32, height: 32 }} />,
  snapchat: <SnapchatIcon style={{ width: 35, height: 35 }} />,
  telegram: <TelegramIcon style={{ width: 35, height: 35 }} />,
  wechat: <WechatIcon style={{ width: 40, height: 40 }} />,
  weibo: <WeiboIcon style={{ width: 33, height: 33 }} />,
  twitch: <TwitchIcon style={{ width: 45, height: 45 }} />,
  elaAddress: <ElaAddressIcon style={{ width: 35, height: 35 }} />,
  wallet: <WalletIcon style={{ width: 33, height: 33 }} />,
  default: <AccountIcon style={{ width: 35, height: 35 }} />,
  // TODO： Replace icon
};
