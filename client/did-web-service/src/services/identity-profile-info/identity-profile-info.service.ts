import { CredentialType } from "@model/credential/credential-type";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
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
  // TODO: user https://ns.elastos.org/credentials/profile/avatar/v1 with schema:avatar  - keep old fields for compatibility
  new ProfileCredentialInfo("avatar", null, {
    defaultSubject: {
      "content-type": "",
      "type": "",
      "data": ""
    },
    converter: null //  TODO
  }),
  new ProfileCredentialInfo("email",
    new CredentialType("https://ns.elastos.org/credentials/profile/email/v1#EmailCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("email")
    }),
  new ProfileCredentialInfo("birthDate",
    new CredentialType("https://ns.elastos.org/credentials/profile/email/v1#BirthDateCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("birthDate")
    }),

  new ProfileCredentialInfo("nationality",
    new CredentialType("did://elastos/iUq76mi2inkZfqqbHkovbcDkzEkAh2dKrb/ISONationalityCredential#ISONationalityCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("nationality")
    }),

  new ProfileCredentialInfo("gender",
    new CredentialType("https://ns.elastos.org/credentials/profile/gender/v1#GenderCredential"),
    {
      multipleInstancesAllowed: true,
      converter: new CredentialValueConverterString("gender")
    }),
  new ProfileCredentialInfo("telephone"),
  new ProfileCredentialInfo("nickname"),
  new ProfileCredentialInfo("birthPlace"),
  new ProfileCredentialInfo("occupation"),
  new ProfileCredentialInfo("education"),
  new ProfileCredentialInfo("interests"),
  new ProfileCredentialInfo("description", new CredentialType("https://ns.elastos.org/credentials/profile/description/v1#DescriptionCredential")),
  new ProfileCredentialInfo("url", new CredentialType("https://ns.elastos.org/credentials/profile/url/v1#URLCredential")),

  // Social credentials
  new ProfileCredentialInfo("discord", new CredentialType("https://ns.elastos.org/credentials/social/discord/v1#DiscordCredential")),
  new ProfileCredentialInfo("linkedin", new CredentialType("https://ns.elastos.org/credentials/social/linkedin/v1#LinkedinCredential")),
  new ProfileCredentialInfo("facebook", new CredentialType("https://ns.elastos.org/credentials/social/facebook/v1#FacebookCredential")),
  new ProfileCredentialInfo("instagram", new CredentialType("https://ns.elastos.org/credentials/social/instagram/v1#InstagramCredential")),
  new ProfileCredentialInfo("twitter", new CredentialType("https://ns.elastos.org/credentials/social/twitter/v1#TwitterCredential")),
  new ProfileCredentialInfo("snapchat", new CredentialType("https://ns.elastos.org/credentials/social/snapchat/v1#SnapchatCredential")),
  new ProfileCredentialInfo("telegram", new CredentialType("https://ns.elastos.org/credentials/social/telegram/v1#TelegramCredential")),
  new ProfileCredentialInfo("wechat", new CredentialType("https://ns.elastos.org/credentials/social/wechat/v1#WechatCredential")),
  new ProfileCredentialInfo("weibo", new CredentialType("https://ns.elastos.org/credentials/social/weibo/v1#WeiboCredential")),
  new ProfileCredentialInfo("twitch"),

  // Wallet credentials
  // TODO ben:
  // - use the new wallet type
  // - Edit UI to allow choosing the address type
  // - Don't support older addresses (strings) but don't crash if receiving a string instead of an object
  new ProfileCredentialInfo("elaAddress", null/* {
    chain: "elastossmartchain",
    network:"mainnet",
    addressType:"elastosmainchain",
    address: ""
  }, "https://ns.elastos.org/credentials/wallet/v1", "WalletCredential" */),

  new ProfileCredentialInfo("wallet"/* {
    chain: "elastossmartchain",
    network:"mainnet",
    addressType:"elastosmainchain",
    address: ""
  }*/, new CredentialType("https://ns.elastos.org/credentials/wallet/v1#WalletCredential"),
    {
      isSensitive: true,
      converter: null // TODO
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
