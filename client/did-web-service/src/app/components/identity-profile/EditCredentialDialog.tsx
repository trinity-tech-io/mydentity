import { ProfileCredential } from "@model/credential/profile-credential";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ProfileCredentialInfo, ProfileCredentialInfoEditionType } from "@services/identity-profile-info/profile-credential-info";
import { createRef, useEffect, useRef, useState } from "react";
import DatePickerCommon from '@components/identity-profile/DatePickerCommon';

export enum EditionMode {
    EDIT,
    NEW
}

export enum SelectedType {
    AVATAR = 'avatar',
    EMAIL = 'email',
    BIRTHDATE = 'birthDate',
    NATIONALITY = 'nationality'
}

export interface EditCredentialDialogProps {
    credentialInfo: ProfileCredentialInfo;
    defaultValue: string;
    open: boolean;
    type: EditionMode;
    originCredential: ProfileCredential;
    onClose: (editCredentialValue?: { info: ProfileCredentialInfo, value?: string, type: EditionMode, originCredential: ProfileCredential, selectedDate?: Date }) => void;
}

function EditCredentialDialog(props: EditCredentialDialogProps): JSX.Element {
    const { credentialInfo, defaultValue, open, type, originCredential, onClose } = props;
    const [editionType, setEditionType] = useState<ProfileCredentialInfoEditionType>(null);
    const radioGroupRef = useRef<HTMLElement>(null);
    const [selectedType, setSelectedType] = useState<SelectedType>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(null);

    useEffect(() => {
        if (open) {
            if (credentialInfo.key === 'birthDate') {
                setSelectedType(SelectedType.BIRTHDATE);
              } else if (credentialInfo.key === 'avatar') {
                setSelectedType(SelectedType.AVATAR);
              } else if (credentialInfo.key === 'email') {
                setSelectedType(SelectedType.EMAIL);
              } else if (credentialInfo.key === 'nationality') {
                setSelectedType(SelectedType.NATIONALITY);
              }
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
        const result = inputRef?.current?.value 
        onClose({ info: credentialInfo, value: result, type: type, originCredential, selectedDate });
    };

    const handleDateChange = (date: Date): void => {
        setSelectedDate(date);
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
                {(selectedType == SelectedType.BIRTHDATE) && (
                    <div className="overlay">
                        <DatePickerCommon selectedDate={selectedDate} onDateChange={handleDateChange} />
                    </div> 
                )}

                {(selectedType == SelectedType.EMAIL) &&
                    <TextField
                        fullWidth={true}
                        label={credentialInfo.key}
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        autoFocus
                    />
                }
                {editionType != ProfileCredentialInfoEditionType.SingleLineString &&
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