import { Credential } from "@model/credential/credential";
import { ProfileCredentialInfo } from "@model/identity/features/profile/profile-credential-info";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { createRef, useEffect, useRef, useState } from "react";

enum DISPLAY_TYPE {
    INPUT = 1,
    SELECT = 2,
    DATE_SELECT = 3,
    INPUT_NUMBER = 4,
    AVATAR = 5
}

export enum EDIT_TYPE {
    EDIT = 1,
    NEW = 2,
}

export interface EditCredentialDialogProps {
    credentialInfo: ProfileCredentialInfo,
    defaultValue: string,
    open: boolean,
    type: EDIT_TYPE,
    originCredential: Credential
    onClose: (editCredentialValue?: { info: ProfileCredentialInfo, value: string, type: EDIT_TYPE, originCredential: Credential }) => void;
}

function EditCredentialDialog(props: EditCredentialDialogProps) {
    const { credentialInfo, defaultValue, open, type, originCredential, onClose } = props;
    const [displayType, setDisplayType] = useState(0);
    const radioGroupRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (open) {
            setDisplayType(selectDisplayType(credentialInfo));
        }
    }, [credentialInfo, open]);

    const inputRef = createRef<HTMLInputElement>()

    const selectDisplayType = (info: ProfileCredentialInfo): number => {
        let displayType = DISPLAY_TYPE.INPUT;
        switch (info.key) {
            case "gender":
            case "nationality":
                displayType = DISPLAY_TYPE.SELECT;
                break;

            case "birthDate":
                displayType = DISPLAY_TYPE.DATE_SELECT;
                break;

            case "telephone":
                displayType = DISPLAY_TYPE.INPUT_NUMBER;
                break;

            case "avatar":
                displayType = DISPLAY_TYPE.AVATAR;
                break;
        }
        return displayType;
    }
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
        onClose({ info: credentialInfo, value: result, type: type, originCredential: originCredential });
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
        >
            {type == EDIT_TYPE.EDIT &&
                <DialogTitle>Edit Item</DialogTitle>
            }
            {type == EDIT_TYPE.NEW &&
                <DialogTitle>Add Item</DialogTitle>
            }
            <DialogContent dividers>
                {displayType == DISPLAY_TYPE.INPUT &&
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
                {displayType != DISPLAY_TYPE.INPUT &&
                    <div>TODO</div>
                }

            </DialogContent>
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