import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { CredentialPreview } from './CredentialPreview';
import { ImportedCredential, ImportedCredentialItem } from './page';

interface Props {
    importedCredential: ImportedCredential
}

export const CredentialPreviewWithDetails: FC<Props> = (props: Props) => {
    const { importedCredential } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [isShowDisplayable, setShowDisplayable] = useState<boolean>(false);
    const [isShowCredentialDetail, setShowCredentialDetail] = useState<boolean>(false);

    const handleHideDetail = (): void => {
        setIsShowDetail(false);
    }

    const handleShowDetail = (): void => {
        setIsShowDetail(true);
    }

    const handleHideDisplayable = (): void => {
        setShowDisplayable(false);
    }

    const handleShowDisplayable = (): void => {
        setShowDisplayable(true);
    }

    const handleHideCredentialDetail = (): void => {
        setShowCredentialDetail(false);
    }

    const handleShowCredentialDetail = (): void => {
        setShowCredentialDetail(true);
    }

    const getDisplayableEntryValue = (value: any): string => {
        if (value instanceof Object) {
            return JSON.stringify(value);
        }
        return value;
    }

    return (
        <Stack alignItems={'center'}>
            <CredentialPreview credential={importedCredential.credential} />
            {isShowDetail &&
                <Stack >
                    <Button variant="text" onClick={handleHideDetail}>hide details</Button>
                    {importedCredential.values.map((importedCredentialItem: ImportedCredentialItem) => (
                        <Card key={importedCredential.name + "-credentialcomponennt"}
                            sx={{
                                mx: 10,
                                my: 1,
                                boxShadow: 0,
                                textAlign: 'left',
                            }}>
                            {!isShowDisplayable &&
                                <Stack px={2} py={2} minWidth={400} alignItems={"left"} >
                                    <div onClick={handleShowDisplayable}>
                                        <Stack direction="row" alignItems={"right"} >
                                            <Typography fontSize={16} minWidth={350} gutterBottom >
                                                <b>{importedCredentialItem.name}</b>
                                            </Typography >
                                            <ExpandMoreIcon />
                                        </Stack>
                                    </div>
                                </Stack>
                            }
                            {isShowDisplayable &&
                                <Stack px={2} py={2} minWidth={400} alignItems={"left"} >
                                    <div onClick={handleHideDisplayable}>
                                        <Stack direction="row" alignItems={"right"} >
                                            <Typography fontSize={16} minWidth={350} gutterBottom >
                                                <b>{importedCredentialItem.name}</b>
                                            </Typography >
                                            <ExpandLessIcon />
                                        </Stack>
                                    </div>
                                    <Typography fontSize={14} gutterBottom>
                                        {importedCredentialItem.value}
                                    </Typography>
                                </Stack>
                            }
                        </Card>
                    ))}
                </Stack>
            }
            {!isShowDetail &&
                <Stack direction="row">
                    <Button variant="text" onClick={handleShowDetail}>Show details</Button>
                </Stack>
            }
        </Stack>
    )
}