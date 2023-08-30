import { ProfileCredential } from "@model/credential/profile-credential";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ProfileCredentialInfo, ProfileCredentialInfoEditionType } from "@services/identity-profile-info/profile-credential-info";
import { createRef, useEffect, useRef, useState } from "react";

export enum EditionMode {
    EDIT,
    NEW
}

export interface EditCredentialDialogProps {
    credentialInfo: ProfileCredentialInfo;
    defaultValue: string;
    open: boolean;
    type: EditionMode;
    originCredential: ProfileCredential;
    onClose: (editCredentialValue?: { info: ProfileCredentialInfo, value: string, type: EditionMode, originCredential: ProfileCredential }) => void;
}

function EditCredentialDialog(props: EditCredentialDialogProps) {
    const { credentialInfo, defaultValue, open, type, originCredential, onClose } = props;
    const [editionType, setEditionType] = useState<ProfileCredentialInfoEditionType>(null);
    const radioGroupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (open) {
            setEditionType(credentialInfo.getConverter().getEditionType());
        }
    }, [credentialInfo, open]);

    const inputRef = createRef<HTMLInputElement>()

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose(null);
    };

    const handleOk = () => {
        const result = inputRef.current.value;
        onClose({ info: credentialInfo, value: result, type: type, originCredential });
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
                {editionType == ProfileCredentialInfoEditionType.SingleLineString &&
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