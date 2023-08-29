import { Credential } from "@model/credential/credential";
import { ProfileCredentialInfo } from "@model/identity/features/profile/profile-credential-info";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { IdentityFeature } from "../identity-feature";

export class ProfileFeature implements IdentityFeature {
  private availableProfileCredentialEntries: ProfileCredentialInfo[];

  constructor(protected identity: Identity) {
    this.setupAvailableProfileCredentialEntries();
  }

  /**
   * Builds the list of profile credentials that this identity can potentially hold.
   * The UI uses those entries to let user select some of them for self VC creation to build
   * his "identity profile".
   */
  private setupAvailableProfileCredentialEntries() {
    this.availableProfileCredentialEntries = [
      // Profile credentials
      new ProfileCredentialInfo("name", "https://ns.elastos.org/credentials/profile/name/v1", "NameCredential"),
      // TODO: user https://ns.elastos.org/credentials/profile/avatar/v1 with schema:avatar  - keep old fields for compatibility
      new ProfileCredentialInfo("avatar", null, null, {
        defaultSubject: {
          "content-type": "",
          "type": "",
          "data": ""
        }
      }),
      new ProfileCredentialInfo("email", "https://ns.elastos.org/credentials/profile/email/v1", "EmailCredential", {
        multipleInstancesAllowed: true
      }),
      new ProfileCredentialInfo("birthDate"),
      new ProfileCredentialInfo("nationality", "did://elastos/iUq76mi2inkZfqqbHkovbcDkzEkAh2dKrb/ISONationalityCredential", "ISONationalityCredential"),
      new ProfileCredentialInfo("gender", "https://ns.elastos.org/credentials/profile/gender/v1", "GenderCredential"),
      new ProfileCredentialInfo("telephone"),
      new ProfileCredentialInfo("nickname"),
      new ProfileCredentialInfo("birthPlace"),
      new ProfileCredentialInfo("occupation"),
      new ProfileCredentialInfo("education"),
      new ProfileCredentialInfo("interests"),
      new ProfileCredentialInfo("description", "https://ns.elastos.org/credentials/profile/description/v1", "DescriptionCredential"),
      new ProfileCredentialInfo("url", "https://ns.elastos.org/credentials/profile/url/v1", "URLCredential"),

      // Social credentials
      new ProfileCredentialInfo("discord", "https://ns.elastos.org/credentials/social/discord/v1", "DiscordCredential"),
      new ProfileCredentialInfo("linkedin", "https://ns.elastos.org/credentials/social/linkedin/v1", "LinkedinCredential"),
      new ProfileCredentialInfo("facebook", "https://ns.elastos.org/credentials/social/facebook/v1", "FacebookCredential"),
      new ProfileCredentialInfo("instagram", "https://ns.elastos.org/credentials/social/instagram/v1", "InstagramCredential"),
      new ProfileCredentialInfo("twitter", "https://ns.elastos.org/credentials/social/twitter/v1", "TwitterCredential"),
      new ProfileCredentialInfo("snapchat", "https://ns.elastos.org/credentials/social/snapchat/v1", "SnapchatCredential"),
      new ProfileCredentialInfo("telegram", "https://ns.elastos.org/credentials/social/telegram/v1", "TelegramCredential"),
      new ProfileCredentialInfo("wechat", "https://ns.elastos.org/credentials/social/wechat/v1", "WechatCredential"),
      new ProfileCredentialInfo("weibo", "https://ns.elastos.org/credentials/social/weibo/v1", "WeiboCredential"),
      new ProfileCredentialInfo("twitch"),

      // Wallet credentials
      // TODO ben:
      // - use the new wallet type
      // - Edit UI to allow choosing the address type
      // - Don't support older addresses (strings) but don't crash if receiving a string instead of an object
      new ProfileCredentialInfo("elaAddress", ""/* {
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
        }*/, "https://ns.elastos.org/credentials/wallet/v1", "WalletCredential", { isSensitive: true }),
    ];
  }

  /**
   * Returns a list of standard profile entries that we can let user add to his profile.
   * Each profile item has its own type (text, date, number...) and the UI will provide a different
   * input method according to this type.
   *
   * Type names follow the Elastos DID standard defined by the Elastos DID specification.
   */
  public getAvailableProfileEntries(): ProfileCredentialInfo[] {
    return this.availableProfileCredentialEntries;
  }

  /**
   * Based on a list of types (for convenience, coming from a VC), returns the first profile info for which
   * the short type is contained in "types".
   */
  public findProfileInfoByTypes(shortTypes: string[]): ProfileCredentialInfo {
    return this.availableProfileCredentialEntries.find(e => shortTypes.includes(e.shortType));
  }


  getCredentialId = (credential: Credential): string => {
    if (!credential && !credential.verifiableCredential && !credential.verifiableCredential.getId())
      return '';
    return credential.verifiableCredential.getId().toString()
  }

  public async deleteCredential(credentialId: string): Promise<boolean> {
    try {
      await this.identity.get("credentials").deleteCredential(credentialId);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  public async createCredential(credentialId: string = null, types: string[], key: string, value: string): Promise<boolean> {
    let credentialType: string[] = [];
    try {
      let finalCredentialId;
      if (!credentialId) {
        finalCredentialId = this.identity.did + "#" + key + randomIntString();
      } else {
        finalCredentialId = credentialId;
      }

      const entry = this.findProfileInfoByTypes(types);
      for (let index = 0; index < types.length; index++) {
        credentialType.push(types[index])
      }
      credentialType.push(entry.context + "#" + entry.shortType);

      const expirationDate = moment().add(5, "years").toDate();

      let prop = {};
      prop[key] = value;

      await this.identity.get("credentials").createCredential(finalCredentialId, credentialType, expirationDate, prop);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  public async updateCredential(credential: Credential, newValue: string) {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = this.findProfileInfoByTypes(credential.verifiableCredential.getType());

    try {
      await this.deleteCredential(credentialId);
      await this.createCredential(
        credentialId,
        credential.verifiableCredential.getType(),
        profileInfoEntry.key,
        newValue);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }
}