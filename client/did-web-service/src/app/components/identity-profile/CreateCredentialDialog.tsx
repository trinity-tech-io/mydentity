import { FC, memo } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Card,
  Fade,
  Grid,
  Modal,
  Stack,
  Typography,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import ChipIcon from "@assets/images/chip.svg";
import Scrollbar from "@components/scrollbar";

const ModalBody = styled(Card)((theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "calc(100vw - 36px)",
  padding: "16px 24px",
}));

const ButtonBaseStyled = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  WebkitTransition: "background 0.2s, color 0.2s",
  MozTransition: "background 0.2s, color 0.2s",
  transition: "background 0.2s, color 0.2s",
  padding: 4,
  borderRadius: 3,
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#1d1d1d" : "#e8e8e8",
    "&:after": {
      WebkitTransform: "scale(1)",
      MozTransform: "scale(1)",
      MsTransform: "scale(1)",
      transform: "scale(1)",
      opacity: 1,
    },
  },
  "&:after": {
    pointerEvents: "none",
    borderRadius: 4,
    position: "absolute",
    width: "100%",
    height: "100%",
    content: "''",
    WebkitBoxSizing: "content-box",
    MozBoxSizing: "content-box",
    boxSizing: "content-box",
    top: -4,
    left: -4,
    padding: 4,
    boxShadow: `0 0 0 2px ${
      theme.palette.mode === "dark" ? "#1d1d1d" : "#e8e8e8"
    }`,
    WebkitTransition: "-webkit-transform 0.2s, opacity 0.2s",
    MozTransition: "-moz-transform 0.2s, opacity 0.2s",
    transition: "transform 0.2s, opacity 0.2s",
    WebkitTransform: "scale(0.8)",
    MozTransform: "scale(0.8)",
    MsTransform: "scale(0.8)",
    transform: "scale(0.8)",
    opacity: 0,
  },
}));

const CredentialItem: FC<{ title: string; onClick: () => void }> = ({
  title,
  onClick,
}) => {
  return (
    <ButtonBaseStyled className="w-full" onClick={onClick}>
      <Stack alignItems="center" spacing={0.5} className="pt-2">
        <div className="relative">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              p: 1,
              color: "primary.dark",
              background: "#8888884d",
            }}
          >
            <ChipIcon />
          </Avatar>
          <Box
            className="rounded-full inline-flex items-center justify-center p-[1px] absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
            sx={{ backgroundColor: "#34A853" }}
          >
            <AddIcon sx={{ color: "white", fontSize: "10pt" }} />
          </Box>
        </div>
        <Typography variant="subtitle2">{title}</Typography>
      </Stack>
    </ButtonBaseStyled>
  );
};

interface CreateCredentialDialog {
  open: boolean;
  onClose: (selectedItem: ProfileCredentialInfo) => void;
  availableItemsForAddition: ProfileCredentialInfo[];
}

const CreateCredentialDialog: FC<CreateCredentialDialog> = ({
  onClose,
  open,
  availableItemsForAddition,
}) => {
  const handleClose = (): void => {
    onClose(null);
  };

  const handleListItemClick = (value: ProfileCredentialInfo): void => {
    onClose(value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open}>
        <ModalBody>
          <Typography variant="h5" color="text.primary" sx={{ pb: 2 }}>
            Add Profile Item
          </Typography>
          <Scrollbar
            props={{ autoHeight: true, autoHeightMin: 300, autoHeightMax: 500 }}
          >
            <Grid
              container
              spacing={1}
              columns={{ xs: 8, sm: 10 }}
              sx={{ maxHeight: "calc(100vh - 80px)", p: .75 }}
            >
              {availableItemsForAddition?.map((addableItem, i) => (
                <Grid item xs={2} key={i}>
                  <CredentialItem
                    title={capitalizeFirstLetter(addableItem.key)}
                    onClick={(): void => handleListItemClick(addableItem)}
                  />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        </ModalBody>
      </Fade>
    </Modal>
  );
};

export default memo(CreateCredentialDialog);
