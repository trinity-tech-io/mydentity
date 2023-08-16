import { ProfileEntryDto } from "./profile-entry.dto";

/**
 * The following two types sync from server side.
 */
export enum ProfileType {
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  AVATAR_URL = 'avatarUrl',
  PHOTO = 'photo',
  LOCATION = 'location',
  COMPANY = 'company',
  EMAIL = 'email',
  TOKEN = 'token',
  DESCRIPTION = 'description',
  JOB_TITLE = 'jobTitle',
  TIME_ZONE = 'timeZone',
}

export enum ProfileTitle {
  FIRSTNAME = 'firstname',
  LASTNAME = 'lastname',
  AVATAR_URL = 'avatarUrl',
  PHOTO = 'photo',
  LOCATION = 'location',
  COMPANY = 'company',
  GOOGLE = 'google',
  DESCRIPTION = 'description',
  JOB_TITLE = 'jobTitle',
  TIME_ZONE = 'timeZone',
}

export class ProfileEntry {
  id?: string;
  userId?: string;
  type?: string;
  title?: string;
  value?: string;
  visible?: boolean;
  isPrimary?: boolean;

  public static fromJson(json: ProfileEntryDto) {
    return Object.assign(new ProfileEntry(), json);
  }

  public static fromJsons(jsons: ProfileEntryDto[]): ProfileEntry[] {
    return jsons.map(j => ProfileEntry.fromJson(j));
  }

  public static getEmailEntry(profiles: ProfileEntry[]): ProfileEntry {
    return profiles.find(p => p.type === ProfileType.EMAIL);
  }
}