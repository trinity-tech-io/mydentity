// import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Credential } from '@model/credential/credential';
import InfoIcon from '@mui/icons-material/Info';
import { Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { shortenString } from '@utils/strings';
import Image from 'next/image';
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
            <div className='mx-4 mb-1 mt-2 shadow text-left'>
                <div className='flex flex-row gap-2 p-2' style={{ width: 400 }}>
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

                        <div className='flex flex-row gap-4 items-center w-full mt-4'>
                            <Stack>
                                <Image unoptimized src={issuerInfo?.avatarIcon} width={30} height={30} style={{ borderRadius: '50%' }} alt="" />
                            </Stack>
                            <div className='flex flex-col'>
                                <Typography fontSize={10} fontWeight={300} noWrap>Issued by:</Typography>
                                <Typography fontSize={13} noWrap>{issuerInfo && shortenString(issuerInfo?.name, 30)}</Typography>
                            </div>
                        </div>
                    </Stack>
                </div>
            </div>
        </Stack>
    )
}