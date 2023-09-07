import { CredentialType } from "@model/credential/credential-type";
import { merge } from "lodash";
import { CredentialValueConverter } from "./credential-value-converter";

export enum ProfileCredentialInfoEditionType {
    SingleLineString,
    MultiLineText,
    Date,
    Country,
    Gender,
    Undefined // ie: for avatar, handled manually
}

export type ProfileCredentialInfoOptions = {
    defaultSubject?: any;
    isSensitive?: boolean;
    multipleInstancesAllowed?: boolean; // Whether user can add several profile entries with this type (ie: emails) or not (ie: nationality)
    converter: CredentialValueConverter<any>;
}

const defaultOptions: ProfileCredentialInfoOptions = {
    defaultSubject: "",
    isSensitive: false,
    multipleInstancesAllowed: false,
    converter: null
}

export class ProfileCredentialInfo {
    constructor(
        public key: string, // Related key in profile credential keys ("name", "avatar"...)
        public type?: CredentialType,
        public options: ProfileCredentialInfoOptions = { converter: null }
    ) {
        options = merge({}, defaultOptions, options);
    }

    public getConverter(): CredentialValueConverter<any> {
        return this.options.converter;
    }

    /**
     * Returns a list of full types to use when creating a profile credential based on this 
     * profile info.
     */
    public typesForCreation(): string[] {
        return [
            this.type.getLongType()
        ];
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