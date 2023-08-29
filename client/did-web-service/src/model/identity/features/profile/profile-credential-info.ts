import { merge } from "lodash";

export type ProfileCredentialInfoOptions = {
    defaultSubject?: any;
    isSensitive?: boolean;
    multipleInstancesAllowed?: boolean; // Whether user can add several profile entries with this type (ie: emails) or not (ie: nationality)
}

const defaultOptions: ProfileCredentialInfoOptions = {
    defaultSubject: "",
    isSensitive: false,
    multipleInstancesAllowed: false
}

export class ProfileCredentialInfo {
    constructor(
        public key: string, // Related key in profile credential keys ("name", "avatar"...)
        public context?: string,
        public shortType?: string,
        public options: ProfileCredentialInfoOptions = {}
    ) {
        options = merge({}, defaultOptions, options);
    }

    /**
     * Returns a displayable string that shows this entry content. For now we put all types in this class, we
     * don't want to build one class per credential type.
     */
    /* toDisplayString() {
        switch (this.key) {
            case 'nationality':
                return this.getDisplayableNation();
            case 'birthDate':
                return this.getDisplayableDate();
            // case 'gender':
            //     return this.getDisplayableGender();
            // case 'wallet':
            //     return this.getDisplayableWallet();
            default:
                return this.value;
        }
    }

    private getDisplayableNation(): string {
        let countryInfo = area.find((a: CountryCodeInfo) => {
            return this.value == a.alpha3;
        });

        if (!countryInfo)
            return null;

        return countryInfo.name;
    }

    private getDisplayableDate(): string {
        if (!this.value || this.value == "")
            return null;

        let d = new Date(this.value);
        return d.toLocaleDateString();
    } */

    // private getDisplayableGender(): string {
    //     if (!this.value || this.value == "")
    //         return null;

    //     return GlobalTranslationService.instance.translateInstant(this.value);
    // }

    // private getDisplayableWallet(): string {
    //     if (!this.value || this.value == "")
    //         return null;

    //     // TODO: If this wallet exists, display the wallet name.
    //     return GlobalTranslationService.instance.translateInstant('common.wallet');
    // }
}