import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ImportedCredential, ImportedCredentialItem } from '../import-credentials/page';
import { CredentialComponent } from './CredentialComponent';

interface Props {
    importedCredential: ImportedCredential
}

export const CredentialAndDetailComponent: FC<Props> = (props: Props) => {
    const { importedCredential } = props;
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [isShowDisplayable, setShowDisplayable] = useState<boolean>(false);
    const [isShowCredentialDetail, setShowCredentialDetail] = useState<boolean>(false);

    const handleHideDetail = ()=> {
        setIsShowDetail(false);
    }

    const handleShowDetail = () => {
        setIsShowDetail(true);
    }

    const handleHideDisplayable = () => {
        setShowDisplayable(false);
    }

    const handleShowDisplayable = () => {
        setShowDisplayable(true);
    }

    const handleHideCredentialDetail = () => {
        setShowCredentialDetail(false);
    }

    const handleShowCredentialDetail = () => {
        setShowCredentialDetail(true);
    }

    const getDisplayableEntryValue = (value: any) => {
        if (value instanceof Object) {
          return JSON.stringify(value);
        }
        return value;
    }

    return (
        <Stack alignItems={'center'}>
            <CredentialComponent credential={importedCredential.credential}/>
                {isShowDetail &&
                <Stack >
                    <Button variant="text" onClick={handleHideDetail}>hide details</Button>
                    {importedCredential.values.map((importedCredentialItem: ImportedCredentialItem)=>(
                        <Card key={importedCredential.name+"-credentialcomponennt"}
                        sx={{
                            mx: 10,
                            my: 1,
                            boxShadow: 0,
                            textAlign: 'left',
                            bgcolor: "#ffffff",
                        }}>
                            {!isShowDisplayable && 
                            <Stack px={2} py={2} minWidth={400} alignItems={"left"} >
                                <div onClick={handleShowDisplayable}>
                                <Stack direction="row"  alignItems={"right"} >
                                    <Typography fontSize={16} minWidth={350} gutterBottom >
                                        <b>{importedCredentialItem.name}</b>
                                    </Typography >
                                <ExpandMoreIcon />
                                </Stack>
                                </div>
                            </Stack>
                            }
                            {isShowDisplayable&&
                            <Stack px={2} py={2} minWidth={400} alignItems={"left"} >
                                <div onClick={handleHideDisplayable}>
                                <Stack direction="row"  alignItems={"right"} >
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