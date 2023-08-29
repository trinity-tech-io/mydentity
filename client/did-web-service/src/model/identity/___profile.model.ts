import { ProfileCredentialInfo } from "@model/identity/features/profile/profile-credential-info";

/**
 * High level representation of the local DID document for convenience while displaying data on UI.
 *
 * Fields in this class match the Elastos DID specification naming convention for credentials.
 */
export class Profile {
    public entries: ProfileCredentialInfo[] = [];

    constructor() { }

    getEntryByKey(key: string) {
        return this.entries.find((e) => {
            return e.key === key;
        });
    }

    setValue(basiccredentialentry: ProfileCredentialInfo, value: string) {
        // If the entry already exists, we just update it. Otherwise we add it first.
        let entry = this.getEntryByKey(basiccredentialentry.key);
        if (!entry) {
            entry = new ProfileCredentialInfo(basiccredentialentry.key, value, basiccredentialentry.context, basiccredentialentry.shortType, basiccredentialentry.isSensitive);
            this.entries.push(entry);
        } else {
            entry.defaultSubject = value;
        }
    }

    deleteEntry(entry: ProfileCredentialInfo) {
        let deletionIndex = this.entries.findIndex((e) => {
            return e.key == entry.key;
        });
        if (deletionIndex >= 0) {
            this.entries.splice(deletionIndex, 1);
        }
    }

    getName(): string {
        let nameEntry = this.getEntryByKey("name");
        if (!nameEntry) return null;

        return nameEntry.defaultSubject;
    }

    getDescription(): string {
        let descriptionEntry = this.getEntryByKey("description");
        if (!descriptionEntry) return null;

        return descriptionEntry.defaultSubject;
    }

    static createDefaultProfile(): Profile {
        let profile = new Profile();

        // Displayable Header Entries
        profile.entries.push(new ProfileCredentialInfo("name", ""));
        profile.entries.push(new ProfileCredentialInfo("avatar", null));
        profile.entries.push(new ProfileCredentialInfo("description", ""));
        // Other Essential Entries
        profile.entries.push(new ProfileCredentialInfo("birthDate", ""));
        profile.entries.push(new ProfileCredentialInfo("nationality", ""));
        profile.entries.push(new ProfileCredentialInfo("email", ""));
        profile.entries.push(new ProfileCredentialInfo("gender", ""));
        profile.entries.push(new ProfileCredentialInfo("telephone", ""));


        return profile;
    }

    static fromProfile(profile: Profile) {
        let newProfile = new Profile();
        Object.assign(newProfile, profile);
        return newProfile;
    }

    isMale() {
        let genderEntry = this.getEntryByKey("gender");
        return (
            !genderEntry || genderEntry.defaultSubject == "" || genderEntry.defaultSubject == "male" || genderEntry.defaultSubject == "M"
        );
    }

    getDefaultProfilePicturePath() {
        if (this.isMale())
            return "assets/identity/images/Guy_Face.svg";
        else
            return "assets/identity/images/DefaultProfileWoman.svg";
    }
}