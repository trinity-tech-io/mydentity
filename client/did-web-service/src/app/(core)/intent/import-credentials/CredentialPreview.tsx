// import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { logger } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { Credential } from '@model/credential/credential';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Card, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { issuerService } from '@services/identity/issuer.service';
import { shortenString } from '@utils/strings';
import { FC, useEffect, useState } from "react";

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
    const [icon, setIcon] = useState<string>('');
    const valueItems = credential.getValueItems();
    const [isPublished, setIsPublished] = useState<boolean>(false); // TODO
    const isSensitive = credential.isSensitiveCredential();
    const [issuerName, setIssuerName] = useState<string>('');
    // const displayableIssuer = ""; // TODO: credential.issuerxxx()

    useEffect(() => {
      fetchIssuerInfo();
    }, [credential]);

    const fetchIssuerInfo = async () => {
      let issuer = credential.verifiableCredential.getIssuer().toString();

      const isPublish = await issuerService.isPublished(issuer);
      setIsPublished(isPublish);

      if (isPublish) {
        const issuerName = await issuerService.getIssuerName(issuer);
        logger.log('credential', 'issuerName:', issuerName);
        setIssuerName(issuerName);

        const issuerIcon = await issuerService.getIssuerAvatar(issuer);
        setIcon(issuerIcon);
      }
    }

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
                                    <Typography fontSize={13} noWrap>{shortenString(issuerName, 30)}</Typography>
                                </Stack>
                            </Stack>
                        </Item>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
}