import { FC, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { Credential } from "@model/credential/credential";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { JsonViewer } from "@components/credential/JsonViewer";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import SharedCountLabel from "@components/credential/SharedCountLabel";

const CredentialBox: FC<{
  id: string;
  credential: Credential;
  expanded: boolean;
  setExpanded: any;
  onClick: (c: Credential) => void;
}> = ({ id, credential, expanded, setExpanded, onClick }) => {
  const [requestingApplications] = useBehaviorSubject(
    credential?.requestingApplications$
  );
  const [isConform] = useBehaviorSubject(credential?.isConform$);
  const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);

  const handleExpanding: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();
    setExpanded((prevIDs: string[]) => {
      let tempIDs = [...prevIDs];
      const thisIndex = tempIDs.findIndex((_id) => _id === id);
      if (thisIndex < 0) {
        tempIDs.length != 1 ? tempIDs.push(id) : (tempIDs = [id]);
      } else tempIDs.splice(thisIndex, 1);
      return tempIDs;
    });
  };

  const handleClick = () => {
    onClick(credential);
  }

  return (
    <div className="relative h-full cursor-pointer" onClick={handleClick}>
      <CardStyled
        className="h-full"
        elevation={0}
        sx={{
          pl: "12px",
          pr: "4px",
          py: "10px",
          display: "grid",
          verticalAlign: "middle",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          overflow="hidden"
          sx={{ height: 42 }}
        >
          <Stack
            direction="row"
            spacing={1}
            flexGrow={1}
            alignItems="center"
            overflow="hidden"
          >
            <CredentialAvatar credential={credential} width={32} height={32} />
            <Stack overflow="hidden">
              <Typography variant="body2" fontWeight={600} noWrap={true}>
                {credential.getDisplayableTitle()}
              </Typography>
              <Typography variant="caption" fontSize="9pt" noWrap={true}>
                {credential.getDisplayValue() && (
                  <JsonViewer data={credential.getDisplayValue()} />
                )}
              </Typography>
            </Stack>
          </Stack>
          <div>
            <IconButton size="small" color="inherit" onClick={handleExpanding}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
        </Stack>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <List dense sx={{ ".MuiListItemText-root": { margin: 0 } }}>
                <ListItem>
                  <ListItemText
                    primary="ISSUANCE DATE"
                    secondary={credential.verifiableCredential.issuanceDate.toLocaleString()}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                    secondaryTypographyProps={{ fontSize: 11 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="EXPIRATION DATE"
                    secondary={credential.verifiableCredential.expirationDate.toLocaleString()}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                    secondaryTypographyProps={{ fontSize: 11 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="CREATED BY"
                    secondary={issuerInfo?.name}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                    secondaryTypographyProps={{ fontSize: 11 }}
                  />
                </ListItem>
              </List>
            </motion.section>
          )}
        </AnimatePresence>
      </CardStyled>
      <div className="inline-flex absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
        <SharedCountLabel
          count={requestingApplications?.length || 0}
          isConform={isConform}
        />
      </div>
    </div>
  );
};
export default CredentialBox;
