import NationalityCommon, { CountryType } from '@components/identity-profile/CountrySelect';
import DatePickerCommon from '@components/identity-profile/DatePickerCommon';
import GenderCommon, { GenderType } from '@components/identity-profile/GenderSelect';
import { ProfileCredential } from "@model/credential/profile-credential";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ProfileCredentialInfo, ProfileCredentialInfoEditionType } from "@services/identity-profile-info/profile-credential-info";
import { createRef, useEffect, useRef, useState } from "react";

export enum EditionMode {
    EDIT,
    NEW
}

export enum SelectedType {
    AVATAR = 'avatar',
    EMAIL = 'email',
    BIRTHDATE = 'birthDate',
    NATIONALITY = 'nationality',
    GENDER = 'gender'
}

export interface EditCredentialDialogProps {
    credentialInfo: ProfileCredentialInfo;
    defaultValue: string;
    open: boolean;
    type: EditionMode;
    originCredential: ProfileCredential;
    onClose: (editCredentialValue?: { info: ProfileCredentialInfo, value: any, type: EditionMode, originCredential: ProfileCredential}) => void;
}

function EditCredentialDialog(props: EditCredentialDialogProps): JSX.Element {
    const { credentialInfo, defaultValue, open, type, originCredential, onClose } = props;
    const [editionType, setEditionType] = useState<ProfileCredentialInfoEditionType>(null);
    const radioGroupRef = useRef<HTMLElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(null);
    const [selectedCountry, setSelectedCountry] = useState<CountryType>(null); 
    const [selectedGender, setSelectedGender] = useState<GenderType | null>(null);

    useEffect(() => {
        if (open) {
            setEditionType(credentialInfo.getConverter().getEditionType());
        }
    }, [credentialInfo, open]);

    const inputRef = createRef<HTMLInputElement>()

    const handleEntering = (): void => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = (): void => {
        onClose(null);
    };

    const handleOk = (): void => {
        let result;
        switch (credentialInfo.getConverter().getEditionType()) {
            case ProfileCredentialInfoEditionType.SingleLineString:
                result = inputRef?.current?.value 
                break
            case ProfileCredentialInfoEditionType.Date:
                result = selectedDate
                break
            case ProfileCredentialInfoEditionType.Country:
                result = selectedCountry 
                break
            case ProfileCredentialInfoEditionType.Gender:
                result = selectedGender 
                break
            default:
                break
          }
        onClose({ info: credentialInfo, value: result, type: type, originCredential});
    };

    const handleDateChange = (date: Date): void => {
        setSelectedDate(date);
    };

    const handleCountrySelect = (country: CountryType): void => {
        setSelectedCountry(country);
      };

    const handleGenderSelect = (gender: GenderType | null): void => {
        setSelectedGender(gender);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
        >
            {/* Title */}
            {type == EditionMode.EDIT && <DialogTitle>Edit Item</DialogTitle>}
            {type == EditionMode.NEW && <DialogTitle>Add Item</DialogTitle>}

            {/* Content input */}
            <DialogContent dividers>
                {(editionType == ProfileCredentialInfoEditionType.SingleLineString) &&
                    <TextField
                        fullWidth={true}
                        label={credentialInfo.key}
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                        autoComplete="off"
                    />
                }
                {editionType == ProfileCredentialInfoEditionType.Date && <DatePickerCommon selectedDate={selectedDate} onDateChange={handleDateChange} />}
                {editionType == ProfileCredentialInfoEditionType.Country && <NationalityCommon selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />}
                {editionType == ProfileCredentialInfoEditionType.Gender && <GenderCommon selectedGender={selectedGender} onGenderSelect={handleGenderSelect} />}
                {editionType == ProfileCredentialInfoEditionType.Undefined &&
                    <div>TODO</div>
                }
            </DialogContent>

            {/* Action buttons */}
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditCredentialDialog;