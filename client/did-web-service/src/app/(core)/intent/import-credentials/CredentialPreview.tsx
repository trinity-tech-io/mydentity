// import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Credential } from '@model/credential/credential';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Card, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { shortenString } from '@utils/strings';
import { FC } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#eeeeee',
    textAlign: 'left',
    maxWidth: 400,
}));

interface Props {
    credential: Credential
}

export const CredentialPreview: FC<Props> = (props: Props) => {
    const { credential } = props;
    const valueItems = credential.getValueItems();
    const isSensitive = credential.isSensitiveCredential();
    const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);

    return (
        <Stack alignItems={'center'}>
            <Card
                sx={{
                    mx: 10,
                    mt: 4,
                    mb: 1,
                    boxShadow: 0,
                    textAlign: 'left',
                    bgcolor: "#ffffff",
                }}>
                <Stack spacing={2} direction="row" px={2} py={2} minWidth={400} maxWidth={400}>
                    <InfoIcon sx={{ fontSize: 40 }} />
                    {/* <Avatar src={icon}/> */}
                    <Stack alignItems={"left"}>
                        <Typography fontSize={18} gutterBottom>
                            <b>{credential.getDisplayableTitle()}</b>
                        </Typography>
                        {
                            valueItems?.map(valueItem => (
                                <Typography key={valueItem.name + "credentialcomponentitem"} fontSize={16} gutterBottom>
                                    {valueItem?.value}
                                </Typography>
                            ))
                        }
                        {isSensitive &&
                            <Typography fontSize={14} color={"#FF6347"} gutterBottom>
                                Sensitive
                            </Typography>
                        }

                        <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Stack>
                                    <Avatar>T</Avatar>
                                </Stack>
                                <Stack sx={{ maxWidth: 400 }}>
                                    <Typography fontSize={13} noWrap>{shortenString(issuerInfo?.name, 30)}</Typography>
                                </Stack>
                            </Stack>
                        </Item>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
}