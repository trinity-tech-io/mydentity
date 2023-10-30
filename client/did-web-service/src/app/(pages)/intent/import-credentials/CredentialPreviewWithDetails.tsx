import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { CredentialPreview } from "./CredentialPreview";
import { ImportedCredential, ImportedCredentialItem } from "./page";
import { CardStyled } from "../../account/security/components/SecuritySection";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import SubAccordion from "../../credentials/list/components/SubAccordion";
import ListItemTextStyled from "../../credentials/list/components/ListItemText";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { shortenString } from "@utils/strings";

interface Props {
  importedCredential: ImportedCredential;
}

export const CredentialPreviewWithDetails: FC<Props> = (props: Props) => {
  const { importedCredential } = props;
  const credential = importedCredential.credential;
  const valueItems = importedCredential.values;
  const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [isShowDisplayable, setShowDisplayable] = useState<boolean>(false);
  const [isShowCredentialDetail, setShowCredentialDetail] =
    useState<boolean>(false);
  const contentTree = credential?.getContentTree();

  const handleHideDetail = (): void => {
    setIsShowDetail(false);
  };

  const handleShowDetail = (): void => {
    setIsShowDetail(true);
  };

  const handleHideDisplayable = (): void => {
    setShowDisplayable(false);
  };

  const handleShowDisplayable = (): void => {
    setShowDisplayable(true);
  };

  const handleHideCredentialDetail = (): void => {
    setShowCredentialDetail(false);
  };

  const handleShowCredentialDetail = (): void => {
    setShowCredentialDetail(true);
  };

  const getDisplayableEntryValue = (value: any): string => {
    if (value instanceof Object) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <CardStyled sx={{ backgroundImage: "unset" }}>
      <Container className="py-4">
        <Stack
          direction="row"
          spacing={1}
          flexGrow={1}
          alignItems="center"
          overflow="hidden"
          className="pb-1"
        >
          <CredentialAvatar credential={credential} width={32} height={32} />
          <Typography
            flexGrow={1}
            variant="body2"
            fontWeight={600}
            noWrap={true}
          >
            {credential?.getDisplayableTitle()}
          </Typography>
        </Stack>
        <List dense sx={{ pl: 2, ".MuiListItemText-root": { margin: 0 } }}>
          {valueItems?.map((item, _id) => {
            const { name, value } = item;
            if (name.toLowerCase() === "subfield")
              return (
                contentTree?.subField && (
                  <ListItem key={_id}>
                    <SubAccordion subfield={contentTree.subField} />
                  </ListItem>
                )
              );
            return (
              <ListItem key={_id}>
                <ListItemTextStyled
                  primary={name.toUpperCase()}
                  secondary={value}
                />
              </ListItem>
            );
          })}
          <ListItem>
            <ListItemTextStyled
              primary="ISSUANCE DATE"
              secondary={credential?.verifiableCredential.issuanceDate.toLocaleString()}
            />
          </ListItem>
          <ListItem>
            <ListItemTextStyled
              primary="EXPIRATION DATE"
              secondary={credential?.verifiableCredential.expirationDate.toLocaleString()}
            />
          </ListItem>
          <ListItem>
            <ListItemTextStyled
              primary="CREATED BY"
              secondary={issuerInfo && shortenString(issuerInfo?.name, 30)}
            />
          </ListItem>
        </List>
        {/* <CredentialPreview credential={importedCredential.credential} /> */}
      </Container>
    </CardStyled>
  );
};
