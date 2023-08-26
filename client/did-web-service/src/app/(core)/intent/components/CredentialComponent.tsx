import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { VerifiableCredentialInfo } from '@model/credential/verifiablecredentialinfo';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Card, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { FC, useEffect, useState } from "react";

type ValueItem = {
    name: string,
    value: string
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#eeeeee',
    textAlign: 'left',
    maxWidth: 400,
}));

interface Props {
    credential: VerifiableCredential
}

export const CredentialComponent: FC<Props> = (props: Props) => {
    const { credential } = props;
    let verifiableCredentialInfo: VerifiableCredentialInfo;
    const [icon, setIcon] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [valueItems, setValueItems] = useState<ValueItem[]>([]);
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [displayableIssuer, setDisplayableIssuer] = useState<string>('');
    const [isSensitive, setIsSensitive] = useState<boolean>(false);

    useEffect(()=>{
        verifiableCredentialInfo = new VerifiableCredentialInfo(credential);
        if (verifiableCredentialInfo){
            verifiableCredentialInfo.prepareForDisplay();

            setTitle(verifiableCredentialInfo.getDisplayableTitle());
            //TODO
            // setIcon(verifiableCredentialInfo.getDisplayableIconSrc());
            setValueItems(getValueItems(verifiableCredentialInfo));
            //TODO
            setIsPublished(false);
            setIsSensitive(verifiableCredentialInfo.isSensitiveCredential());
            setDisplayableIssuer(getIssuerName(verifiableCredentialInfo));

        }
    },[verifiableCredentialInfo]);

    /**
     * Values representing the credential content, if the credential is not a DisplayableCredential.
     * typically, this is the list JSON fields.
     * Returns null if nothing can be displayed easily.
     */
    const getValueItems = (verifiableCredentialInfo: VerifiableCredentialInfo): ValueItem[] => {
        let fragment = verifiableCredentialInfo.getFragment();
        if (fragment === "avatar")
            return null;

        let subject = verifiableCredentialInfo.getSubject().getProperties();
        // TODO: rework with displayable credential - for now, display raw properties
        return Object.keys(subject)
            .filter((key) => key != "id")
            .filter((key) => key != "displayable")
            .sort()
            .map((prop) => {
                let value = '';
                if (prop == 'wallet') {
                    value = 'wallet';
                    if (subject[prop]) {
                    //TODO
                    //   let networkWallet = WalletService.instance.getNetworkWalletByWalletCredential(subject[prop]);
                    //   if (networkWallet) {
                    //     value += ' - ' + networkWallet.masterWallet.name;
                    //   }
                    }
                } else if (prop == 'gender') {
                    if (subject[prop] == 'M' || subject[prop] == 'male') {
                        value = "male";
                    } else if (subject[prop] == 'F' || subject[prop] == 'female') {
                        value = "female";
                    }
                } else {
                    value = subject[prop].toString() != ""
                        ? subject[prop].toString()
                        : "not set";
                }

                return {
                    name: prop,
                    value: value
                };
            });
    }

    //TODO
    const selfIssued = (): boolean => {
        return false;
    }

    //TODO
    const getIssuerName = (verifiableCredentialInfo: VerifiableCredentialInfo): string => {
        return verifiableCredentialInfo.getIssuer();
    }

    const shortenString = (inputString: string, maxLength: number): string => {
        return inputString.length > maxLength ? 
            inputString.substring(0, maxLength/2-1)+ "..." + 
                inputString.substring(inputString.length - (maxLength/2-1) , inputString.length): 
            inputString;
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
                <Stack spacing={2} direction="row"  px={2} py={2} minWidth={400} maxWidth={400}>
                    <InfoIcon sx={{ fontSize: 40 }} />
                    {/* <Avatar src={icon}/> */}
                    <Stack  alignItems={"left"}>
                        <Typography fontSize={18} gutterBottom>
                        <b>{title}</b>
                        </Typography>
                        {
                            valueItems?.map(valueItem =>(
                                <Typography key={valueItem.name+"credentialcomponentitem"} fontSize={16} gutterBottom>
                                    {valueItem?.value}
                                </Typography>
                            ))
                        }
                        {isSensitive &&
                            <Typography fontSize={14}  color={"#FF6347"} gutterBottom>
                            Sensitive
                            </Typography>
                        }

                        <Item
                            sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                            }}
                        >
                            <Stack spacing={2} direction="row" alignItems="center">
                            <Stack>
                                <Avatar>T</Avatar>
                            </Stack>
                            <Stack sx={{ maxWidth: 400 }}>
                                <Typography fontSize={13} noWrap>{shortenString(displayableIssuer,30)}</Typography>
                            </Stack>
                            </Stack>
                        </Item>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    )
  }