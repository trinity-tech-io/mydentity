import { CredentialType } from "@model/credential/credential-type";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { CredentialValueConverterAvatar } from "./converters/avatar-converter";
import { CredentialValueConverterDate } from "./converters/date-converter";
import { CredentialValueConverterGender } from "./converters/gender-converter";
import { CredentialValueConverterNationality } from "./converters/nationality-converter";
import { CredentialValueConverterString } from "./converters/string-converter";

/**
 * List of profile credentials that this identity can potentially hold.
 * The UI uses those entries to let user select some of them for self VC creation to build
 * his "identity profile".
 */
const availableProfileCredentialEntries: ProfileCredentialInfo[] = [
  // Profile credentials
  new ProfileCredentialInfo("name",
    new CredentialType("https://ns.elastos.org/credentials/profile/name/v1#NameCredential"),
    { converter: new CredentialValueConverterString("name") }
  ),
  new ProfileCredentialInfo("avatar",
    new CredentialType("https://ns.elastos.org/credentials/profile/avatar/v1#AvatarCredential"),
    { converter: new CredentialValueConverterAvatar("avatar") }
  ),
  new ProfileCredentialInfo("email",
    new CredentialType("https://ns.elastos.org/credentials/profile/email/v1#EmailCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("email")
    }
  ),
  new ProfileCredentialInfo("birthDate",
    new CredentialType("https://ns.elastos.org/credentials/profile/birthDate/v1#BirthDateCredential"),
    {
      converter: new CredentialValueConverterDate("birthDate")
    }
  ),
  new ProfileCredentialInfo("nationality",
    new CredentialType("did://elastos/iUq76mi2inkZfqqbHkovbcDkzEkAh2dKrb/ISONationalityCredential#ISONationalityCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterNationality("nationality")
    }
  ),
  new ProfileCredentialInfo("gender",
    new CredentialType("https://ns.elastos.org/credentials/profile/gender/v1#GenderCredential"),
    {
      converter: new CredentialValueConverterGender("gender")
    }
  ),
  new ProfileCredentialInfo("telephone",
    new CredentialType("https://ns.elastos.org/credentials/profile/telephone/v1#TelephoneCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("telephone") // TODO:
    }
  ),
  new ProfileCredentialInfo("nickname",
    new CredentialType("https://ns.elastos.org/credentials/profile/nickname/v1#NicknameCredential"),
    {
      converter: new CredentialValueConverterString("nickname") // TODO:
    }
  ),
  new ProfileCredentialInfo("birthPlace",
    new CredentialType("https://ns.elastos.org/credentials/profile/birthPlace/v1#BirthPlaceCredential"),
    {
      converter: new CredentialValueConverterString("birthPlace") // TODO:
    }
  ),
  new ProfileCredentialInfo("occupation",
    new CredentialType("https://ns.elastos.org/credentials/profile/occupation/v1#OccupationCredential"),
    {
      converter: new CredentialValueConverterString("occupation") // TODO:
    }
  ),
  new ProfileCredentialInfo("education",
    new CredentialType("https://ns.elastos.org/credentials/profile/education/v1#EducationCredential"),
    {
      converter: new CredentialValueConverterString("education") // TODO:
    }
  ),
  new ProfileCredentialInfo("interests",
    new CredentialType("https://ns.elastos.org/credentials/profile/interests/v1#InterestsCredential"),
    {
      converter: new CredentialValueConverterString("interests") // TODO:
    }
  ),
  new ProfileCredentialInfo("description",
    new CredentialType("https://ns.elastos.org/credentials/profile/description/v1#DescriptionCredential"),
    {
      converter: new CredentialValueConverterString("description") // TODO:
    }
  ),
  new ProfileCredentialInfo("url",
    new CredentialType("https://ns.elastos.org/credentials/profile/url/v1#URLCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("url") // TODO:
    }
  ),
  // Social credentials
  new ProfileCredentialInfo("discord",
    new CredentialType("https://ns.elastos.org/credentials/social/discord/v1#DiscordCredential"),
    {
      converter: new CredentialValueConverterString("discord") // TODO:
    }
  ),
  new ProfileCredentialInfo("linkedin",
    new CredentialType("https://ns.elastos.org/credentials/social/linkedin/v1#LinkedinCredential"),
    {
      converter: new CredentialValueConverterString("linkedin") // TODO:
    }
  ),
  new ProfileCredentialInfo("facebook",
    new CredentialType("https://ns.elastos.org/credentials/social/facebook/v1#FacebookCredential"),
    {
      converter: new CredentialValueConverterString("facebook") // TODO:
    }
  ),
  new ProfileCredentialInfo("instagram",
    new CredentialType("https://ns.elastos.org/credentials/social/instagram/v1#InstagramCredential"),
    {
      converter: new CredentialValueConverterString("instagram") // TODO:
    }
  ),
  new ProfileCredentialInfo("twitter",
    new CredentialType("https://ns.elastos.org/credentials/social/twitter/v1#TwitterCredential"),
    {
      converter: new CredentialValueConverterString("twitter") // TODO:
    }
  ),
  new ProfileCredentialInfo("snapchat",
    new CredentialType("https://ns.elastos.org/credentials/social/snapchat/v1#SnapchatCredential"),
    {
      converter: new CredentialValueConverterString("snapchat") // TODO:
    }
  ),
  new ProfileCredentialInfo("telegram",
    new CredentialType("https://ns.elastos.org/credentials/social/telegram/v1#TelegramCredential"),
    {
      converter: new CredentialValueConverterString("telegram") // TODO:
    }
  ),
  new ProfileCredentialInfo("wechat",
    new CredentialType("https://ns.elastos.org/credentials/social/wechat/v1#WechatCredential"),
    {
      converter: new CredentialValueConverterString("wechat") // TODO:
    }
  ),
  new ProfileCredentialInfo("weibo",
    new CredentialType("https://ns.elastos.org/credentials/social/weibo/v1#WeiboCredential"),
    {
      converter: new CredentialValueConverterString("weibo") // TODO:
    }
  ),
  new ProfileCredentialInfo("twitch",
    new CredentialType("https://ns.elastos.org/credentials/social/twitch/v1#TwitchCredential"),
    {
      converter: new CredentialValueConverterString("twitch") // TODO:
    }
  ),

  // Wallet credentials
  // TODO ben:
  // - use the new wallet type
  // - Edit UI to allow choosing the address type
  // - Don't support older addresses (strings) but don't crash if receiving a string instead of an object
  new ProfileCredentialInfo("elaAddress",
    new CredentialType("https://ns.elastos.org/credentials/elaAddress/v1#ElaAddressCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("elaAddress") // TODO:
    }
    // {
    //   chain: "elastossmartchain",
    //   network:"mainnet",
    //   addressType:"elastosmainchain",
    //   address: ""
    //   }, "https://ns.elastos.org/credentials/wallet/v1", "WalletCredential"
  ),

  new ProfileCredentialInfo("wallet"/* {
    chain: "elastossmartchain",
    network:"mainnet",
    addressType:"elastosmainchain",
    address: ""
  }*/, new CredentialType("https://ns.elastos.org/credentials/wallet/v1#WalletCredential"),
    {
      isSensitive: true,
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("wallet") // TODO:
    })
];

/**
 * Returns a list of standard profile entries that we can let user add to his profile.
 * Each profile item has its own type (text, date, number...) and the UI will provide a different
 * input method according to this type.
 *
 * Type names follow the Elastos DID standard defined by the Elastos DID specification.
 */
export function getAvailableProfileEntries(): ProfileCredentialInfo[] {
  return availableProfileCredentialEntries;
}

/**
 * Based on a list of types (for convenience, coming from a VC), returns the first profile info for which
 * the short type is contained in "types".
 *
 * Because of the way JSON LD separates contexts and typs without clear attachment in credentials content,
 * we cannot rebuild a full type from a credential. So sometimes, this method receives short types.
 * We assume that those short types are only profile types, and unique.
 */
export function findProfileInfoByTypes(shortOrLongTypes: string[]): ProfileCredentialInfo {
  return availableProfileCredentialEntries.find(e => e.type?.containedIn(shortOrLongTypes));
}

export function findProfileInfoByKey(key: string): ProfileCredentialInfo {
  return availableProfileCredentialEntries.find(e => e.key === key);
}
